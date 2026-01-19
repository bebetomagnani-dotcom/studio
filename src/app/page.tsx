'use client';

import { useState, useMemo } from 'react';
import { CalculatorForm, type CalculatorState } from '@/components/calculator-form';
import { ResultsDisplay } from '@/components/results-display';
import { Faq } from '@/components/faq';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const [state, setState] = useState<CalculatorState>({
    budget: 10000,
    taxIncluded: true,
    cpc: 2.5,
    ctr: 1.5,
    cvr: 2.0,
    ticket: 300,
    productCost: 50,
    otherFees: 4,
  });

  const TAX_RATE = 0.1215;

  const results = useMemo(() => {
    const { budget, taxIncluded, cpc, ctr, cvr, ticket, productCost, otherFees } = state;

    const budgetInput = budget > 0 ? budget : 0;
    const cpcInput = cpc > 0 ? cpc : 0.01; // avoid division by zero
    
    let totalBudget = 0;
    let mediaSpend = 0;

    if (taxIncluded) {
      totalBudget = budgetInput;
      mediaSpend = budgetInput / (1 + TAX_RATE);
    } else {
      mediaSpend = budgetInput;
      totalBudget = budgetInput * (1 + TAX_RATE);
    }

    const taxAmount = totalBudget - mediaSpend;

    const clicks = cpcInput > 0 ? mediaSpend / cpcInput : 0;
    const conversions = clicks * (cvr / 100);
    const revenue = conversions * ticket;
    
    const realCac = conversions > 0 ? totalBudget / conversions : 0;
    const roas = totalBudget > 0 ? revenue / totalBudget : 0;
    const profit = revenue - totalBudget - (conversions * productCost) - (revenue * (otherFees / 100));

    const impressions = ctr > 0 ? (clicks / (ctr / 100)) : 0;
    const cpm = impressions > 0 ? (mediaSpend / impressions) * 1000 : 0;

    return {
      totalBudget,
      mediaSpend,
      taxAmount,
      clicks,
      conversions,
      revenue,
      realCac,
      roas,
      profit,
      impressions,
      cpm
    };
  }, [state]);

  return (
    <main className="min-h-screen bg-background font-body p-4 sm:p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="text-center md:text-left mb-10">
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter">
            Meta Ads Tax Navigator
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            A calculadora de inteligência para o novo cenário fiscal de anúncios no Brasil.
          </p>
          <p className="text-sm text-muted-foreground">Uma ferramenta por Matheus Henrike</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-2 mb-8 lg:mb-0">
            <CalculatorForm state={state} setState={setState} />
          </div>
          <div className="lg:col-span-3">
             <div className="lg:sticky lg:top-10">
                <ResultsDisplay results={results} />
             </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="mt-12">
          <Faq />
        </div>
      </div>
    </main>
  );
}
