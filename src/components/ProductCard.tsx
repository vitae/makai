"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

/* ─── Types ─── */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  emoji: string;
  tag?: string;
}

/* ─── Inner checkout form ─── */
function CheckoutForm({
  product,
  onSuccess,
  onCancel,
}: {
  product: Product;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      setLoading(true);
      setError(null);

      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message ?? "Payment failed.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: product.price,
            productName: product.name,
          }),
        });

        const data = await res.json();

        if (!res.ok || data.error) {
          setError(data.error ?? "Could not create payment.");
          setLoading(false);
          return;
        }

        const { error: confirmError } = await stripe.confirmPayment({
          elements,
          clientSecret: data.clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/success`,
          },
          redirect: "if_required",
        });

        if (confirmError) {
          setError(confirmError.message ?? "Payment failed.");
        } else {
          setSucceeded(true);
          onSuccess();
        }
      } catch {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    },
    [stripe, elements, product, onSuccess]
  );

  if (succeeded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-6"
      >
        <div className="text-5xl">🌊✨</div>
        <p className="text-xl font-bold text-yellow-300">Mahalo! 🌺</p>
        <p className="text-white/80 text-sm text-center">
          Your order is confirmed. Aloha vibes incoming!
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <PaymentElement
        options={{
          layout: "tabs",
        }}
      />

      {error && (
        <p className="text-red-300 text-sm bg-red-900/30 border border-red-500/30 rounded-xl px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-3 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="glass-btn flex-1 py-3 text-sm"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !stripe}
          className="flex-1 py-3 text-sm font-semibold rounded-full text-white transition-all duration-300 disabled:opacity-60"
          style={{
            background:
              "linear-gradient(135deg, #ff6b35 0%, #ff4081 50%, #ffd54f 100%)",
            boxShadow: "0 4px 20px rgba(255, 107, 53, 0.5)",
          }}
        >
          {loading ? "Processing…" : `Pay $${(product.price / 100).toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}

/* ─── Product card ─── */
export default function ProductCard({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [intentError, setIntentError] = useState<string | null>(null);

  const handleBuyNow = useCallback(async () => {
    if (expanded) {
      setExpanded(false);
      setClientSecret(null);
      return;
    }

    setExpanded(true);
    setLoadingIntent(true);
    setIntentError(null);

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: product.price, productName: product.name }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setIntentError(data.error ?? "Could not load payment.");
        setLoadingIntent(false);
        return;
      }

      setClientSecret(data.clientSecret);
    } catch {
      setIntentError("Network error. Please try again.");
    } finally {
      setLoadingIntent(false);
    }
  }, [expanded, product]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card relative overflow-hidden"
      style={{ padding: "1.75rem" }}
    >
      {/* Tag badge */}
      {product.tag && (
        <span
          className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
          style={{
            background: "linear-gradient(135deg, #ff6b35, #ff4081)",
            boxShadow: "0 2px 10px rgba(255,64,129,0.5)",
          }}
        >
          {product.tag}
        </span>
      )}

      {/* Product info */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="text-5xl animate-float"
          role="img"
          aria-label={product.name}
        >
          {product.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white leading-tight">
            {product.name}
          </h3>
          <p className="text-white/70 text-sm mt-1 leading-relaxed">
            {product.description}
          </p>
          <p
            className="text-2xl font-bold mt-3 shimmer-text"
          >
            ${(product.price / 100).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Buy button */}
      {!paymentDone && (
        <button
          onClick={handleBuyNow}
          className="glass-btn w-full py-3 text-sm"
        >
          {expanded ? "✕ Close" : "🛒 Buy Now"}
        </button>
      )}

      {/* Expanded payment area */}
      <AnimatePresence>
        {expanded && !paymentDone && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-5 pt-5 border-t border-white/15">
              {loadingIntent && (
                <div className="flex items-center justify-center py-8">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-yellow-300/30 border-t-yellow-300 animate-spin"
                  />
                </div>
              )}

              {intentError && (
                <p className="text-red-300 text-sm bg-red-900/20 border border-red-500/30 rounded-xl px-3 py-2">
                  {intentError}
                </p>
              )}

              {clientSecret && !loadingIntent && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "night",
                      variables: {
                        colorPrimary: "#ffd54f",
                        colorBackground: "#0d1b2a",
                        colorText: "#ffffff",
                        colorDanger: "#ff6b6b",
                        borderRadius: "12px",
                        fontSizeBase: "14px",
                      },
                    },
                  }}
                >
                  <CheckoutForm
                    product={product}
                    onSuccess={() => {
                      setPaymentDone(true);
                      setExpanded(false);
                    }}
                    onCancel={() => {
                      setExpanded(false);
                      setClientSecret(null);
                    }}
                  />
                </Elements>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success state */}
      {paymentDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-2 py-4"
        >
          <div className="text-4xl">🌺</div>
          <p className="font-semibold text-yellow-300">Order placed! Mahalo!</p>
        </motion.div>
      )}
    </motion.div>
  );
}
