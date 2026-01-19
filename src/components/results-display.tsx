'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedNumber } from '@/components/animated-number';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp, Wallet, Target, ShoppingCart, Percent, Eye, BarChart } from 'lucide-react';

type Results = {
  totalBudget: number;
  mediaSpend: number;
  taxAmount: number;
  clicks: number;
  conversions: number;
  revenue: number;
  realCac: number;
  roas: number;
  profit: number;
  impressions: number;
  cpm: number;
};

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const formatNumber = (value: number) => Math.round(value).toLocaleString('pt-BR');

const chartConfig = {
  value: { label: 'Valor' },
  mediaSpend: { label: 'Mídia', color: 'hsl(var(--primary))' },
  taxAmount: { label: 'Imposto', color: 'hsl(var(--accent))' },
} satisfies ChartConfig;

function ResultCard({ icon: Icon, label, value, tooltip }: { icon: React.ElementType, label: string, value: string, tooltip: string }) {
    return (
        <Card className="bg-muted/30 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-code">{value}</div>
            </CardContent>
        </Card>
    )
}

export function ResultsDisplay({ results }: { results: Results }) {
  const chartData = useMemo(() => [
    { name: 'mediaSpend', value: results.mediaSpend, fill: 'var(--color-mediaSpend)' },
    { name: 'taxAmount', value: results.taxAmount, fill: 'var(--color-taxAmount)' },
  ], [results.mediaSpend, results.taxAmount]);

  const taxPercentage = results.totalBudget > 0 ? (results.taxAmount / results.totalBudget) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col justify-center items-center text-center p-6 border-border/50 bg-card/50">
          <h3 className="font-code text-sm font-light text-muted-foreground">ROAS REAL</h3>
          <AnimatedNumber
            value={results.roas}
            className={cn(
              'font-headline text-6xl font-extrabold tracking-tighter',
              results.roas < 1 ? 'text-destructive' : 'text-success-DEFAULT'
            )}
            formatter={(n) => n.toFixed(2)}
          />
           <p className="text-xs text-muted-foreground">Retorno sobre Investimento Total</p>
        </Card>
        <Card className="flex flex-col justify-center items-center text-center p-6 border-border/50 bg-card/50">
          <h3 className="font-code text-sm font-light text-muted-foreground">LUCRO LÍQUIDO</h3>
          <AnimatedNumber
            value={results.profit}
            className={cn(
              'font-headline text-6xl font-extrabold tracking-tighter',
              results.profit < 0 ? 'text-destructive' : 'text-success-DEFAULT'
            )}
            formatter={formatCurrency}
          />
          <p className="text-xs text-muted-foreground">Receita - Custos Totais</p>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="font-headline">Análise Financeira</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="sm:col-span-1 md:col-span-1 flex flex-col items-center justify-center">
                 <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[180px] w-[180px]">
                    <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5} startAngle={90} endAngle={450}>
                        {chartData.map((entry) => (
                             <Cell key={entry.name} fill={entry.fill} />
                        ))}
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                return (
                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold font-headline">
                                        {taxPercentage.toFixed(1)}%
                                    </tspan>
                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 15} className="fill-muted-foreground text-xs">
                                        Imposto
                                    </tspan>
                                    </text>
                                );
                                }
                            }}
                        />
                    </Pie>
                    </PieChart>
                </ChartContainer>
            </div>
            <div className="sm:col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
                <ResultCard icon={Wallet} label="Orçamento Total" value={formatCurrency(results.totalBudget)} tooltip="Custo total, incluindo impostos."/>
                <ResultCard icon={BarChart} label="Verba de Mídia" value={formatCurrency(results.mediaSpend)} tooltip="Valor real investido em anúncios."/>
                <ResultCard icon={TrendingUp} label="Receita Gerada" value={formatCurrency(results.revenue)} tooltip="Faturamento total das vendas."/>
                <ResultCard icon={TrendingDown} label="CAC Real" value={formatCurrency(results.realCac)} tooltip="Custo real para adquirir um cliente."/>
            </div>
        </CardContent>
      </Card>
      
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="font-headline">Métricas de Performance</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ResultCard icon={Target} label="Cliques" value={formatNumber(results.clicks)} tooltip="Número total de cliques nos anúncios."/>
            <ResultCard icon={ShoppingCart} label="Conversões" value={formatNumber(results.conversions)} tooltip="Número de vendas ou leads gerados."/>
            <ResultCard icon={Eye} label="Impressões" value={formatNumber(results.impressions)} tooltip="Número de vezes que seus anúncios foram exibidos."/>
            <ResultCard icon={Percent} label="CPM" value={formatCurrency(results.cpm)} tooltip="Custo por mil impressões."/>
        </CardContent>
      </Card>

    </div>
  );
}
