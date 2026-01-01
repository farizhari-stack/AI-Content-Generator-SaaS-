"use client";

import { Check } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const plans = [
    {
        name: "Weekly",
        price: "$9",
        period: "/week",
        description: "Perfect for short-term projects",
        features: [
            "100 AI Generations",
            "Basic Support",
            "Standard Speed",
            "Access to all templates"
        ],
        highlight: false
    },
    {
        name: "Monthly",
        price: "$29",
        period: "/month",
        description: "Best value for growing businesses",
        features: [
            "Unlimited AI Generations",
            "Priority Support",
            "Fast Generation Speed",
            "Advanced SEO Tools",
            "History & Analytics"
        ],
        highlight: true,
        badge: "Most Popular"
    },
    {
        name: "Yearly",
        price: "$290",
        period: "/year",
        description: "Maximum savings for power users",
        features: [
            "Everything in Monthly",
            "2 Months Free",
            "API Access",
            "Custom Branding"
        ],
        highlight: false
    }
];

export default function PricingPage() {
    return (
        <div className="container py-20 mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                    Simple, Transparent Pricing
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Choose the plan that fits your business needs. Upgrade or cancel at any time.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                {plans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={`relative flex flex-col ${plan.highlight
                            ? "border-primary shadow-2xl scale-105 z-10"
                            : "border-border hover:border-primary/50 transition-colors"
                            }`}
                    >
                        {plan.highlight && (
                            <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                <Badge className="bg-primary hover:bg-primary px-4 py-1">
                                    {plan.badge}
                                </Badge>
                            </div>
                        )}

                        <CardHeader>
                            <CardTitle className="text-2xl">{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="flex-1">
                            <div className="mb-6">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className="text-muted-foreground">{plan.period}</span>
                            </div>

                            <ul className="space-y-3">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm">
                                        <div className="rounded-full bg-primary/10 p-1">
                                            <Check className="h-4 w-4 text-primary" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter>
                            <Button
                                className="w-full"
                                variant={plan.highlight ? "default" : "outline"}
                                size="lg"
                            >
                                Get Started
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
