import { useState } from "react";

export default function Shipping() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState(null);

  const checkDelivery = () => {
    const pin = String(pincode).trim();

    if (!pin || pin.length !== 6 || isNaN(pin)) {
      setResult("Please enter a valid 6-digit pincode");
      return;
    }

    const fastCities = ["400", "401", "110", "560", "600", "700"];
    const prefix = pin.substring(0, 3);

    if (fastCities.includes(prefix)) {
      setResult("🚀 Delivery in 2-3 days (Major Cities)");
    } else {
      setResult("📦 Delivery in 4-7 days");
    }
  };

  return (
    <div className="min-h-screen bg-soft py-8 md:py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-card rounded-3xl p-6 md:p-10 shadow-sm">
          <h1 className="heading-font text-3xl md:text-4xl mb-3 text-text">
            Shipping Policy
          </h1>
          <p className="text-text/70 text-base md:text-lg">
            Fast & reliable delivery across India with love ❤️
          </p>
        </div>

        {/* Delivery Checker */}
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="heading-font text-2xl mb-6 text-text">
            Check Delivery Time
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              maxLength={6}
              placeholder="Enter your Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="flex-1 px-6 py-4 bg-soft border border-gray-200 dark:border-gray-700 rounded-2xl focus:border-primary outline-none text-text placeholder:text-gray-400"
            />
            <button
              onClick={checkDelivery}
              className="px-10 py-4 bg-primary hover:bg-amber-700 text-white rounded-2xl font-medium transition whitespace-nowrap"
            >
              Check Now
            </button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-soft rounded-2xl text-text font-medium">
              {result}
            </div>
          )}
        </div>

        {/* Shipping Details */}
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="heading-font text-2xl mb-6 text-text">
            Why Shop With Us?
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-soft rounded-2xl">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="font-semibold text-lg mb-2 text-text">
                Free Shipping
              </h3>
              <p className="text-text/70 text-sm">
                On all prepaid orders above ₹999
              </p>
            </div>

            <div className="p-6 bg-soft rounded-2xl">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="font-semibold text-lg mb-2 text-text">
                Fast Dispatch
              </h3>
              <p className="text-text/70 text-sm">
                Orders processed within 24 hours
              </p>
            </div>

            <div className="p-6 bg-soft rounded-2xl">
              <div className="text-3xl mb-4">📦</div>
              <h3 className="font-semibold text-lg mb-2 text-text">
                Delivery Time
              </h3>
              <p className="text-text/70 text-sm">
                2-3 days in major cities • 4-7 days elsewhere
              </p>
            </div>

            <div className="p-6 bg-soft rounded-2xl">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="font-semibold text-lg mb-2 text-text">
                Live Tracking
              </h3>
              <p className="text-text/70 text-sm">
                Real-time tracking via SMS & Email
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-card rounded-3xl p-6 md:p-8 shadow-sm">
          <h2 className="heading-font text-2xl mb-6 text-text">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6 text-sm md:text-base">
            <div>
              <p className="font-semibold text-text mb-2">
                When will my order be shipped?
              </p>
              <p className="text-text/70">
                Most orders are dispatched within 24 hours of confirmation.
              </p>
            </div>

            <div>
              <p className="font-semibold text-text mb-2">
                Do you offer Cash on Delivery?
              </p>
              <p className="text-text/70">
                Yes, COD is available if delivery address is within 10km of our
                shop.
              </p>
            </div>

            <div>
              <p className="font-semibold text-text mb-2">
                Can I track my order?
              </p>
              <p className="text-text/70">
                Yes, tracking link is sent via SMS and email after dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
