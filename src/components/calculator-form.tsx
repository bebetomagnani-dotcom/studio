'use client';

import type { Dispatch, SetStateAction, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { InfoTooltip } from '@/components/info-tooltip';

export type CalculatorState = {
  budget: number;
  taxIncluded: boolean;
  cpc: number;
  ctr: number;
  cvr: number;
  ticket: number;
  productCost: number;
  otherFees: number;
};

type Props = {
  state: CalculatorState;
  setState: Dispatch<SetStateAction<CalculatorState>>;
};

const InputGroup = ({
  label,
  tooltip,
  htmlFor,
  children,
}: {
  label: string;
  tooltip: string;
  htmlFor: string;
  children: ReactNode;
}) => (
  <div className="space-y-2">
    <div className="flex items-center">
      <Label htmlFor={htmlFor} className="font-code text-sm font-light text-muted-foreground">
        {label}
      </Label>
      <InfoTooltip text={tooltip} />
    </div>
    {children}
  </div>
);

const InputWithAddon = ({ addon, ...props }: { addon: string } & React.ComponentProps<typeof Input>) => (
  <div className="relative">
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
      <span className="text-muted-foreground sm:text-sm">{addon}</span>
    </div>
    <Input {...props} className="pl-9 text-base" />
  </div>
);

export function CalculatorForm({ state, setState }: Props) {
  const handleStateChange = (field: keyof CalculatorState) => (value: any) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="font-headline">Parâmetros de Entrada</CardTitle>
        <CardDescription>Ajuste as variáveis para simular seu cenário.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <InputGroup htmlFor="budget" label="Orçamento" tooltip="O valor total que você planeja usar.">
          <InputWithAddon
            addon="R$"
            id="budget"
            type="number"
            value={state.budget}
            onChange={(e) => handleStateChange('budget')(Number(e.target.value))}
            placeholder="10000"
          />
        </InputGroup>

        <div className="flex items-center justify-between rounded-lg border border-border p-3 shadow-sm">
          <div className="space-y-0.5">
            <Label htmlFor="tax-included" className="font-code text-sm font-light text-muted-foreground">
              O orçamento já inclui impostos?
            </Label>
            <p className="text-xs text-muted-foreground">
              {state.taxIncluded
                ? 'Calcula quanto de mídia real você terá.'
                : 'Calcula o custo total para atingir a meta de mídia.'}
            </p>
          </div>
          <Switch
            id="tax-included"
            checked={state.taxIncluded}
            onCheckedChange={handleStateChange('taxIncluded')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputGroup htmlFor="cpc" label="Custo por Clique (CPC)" tooltip="Seu custo médio por cada clique no anúncio.">
            <InputWithAddon
              addon="R$"
              id="cpc"
              type="number"
              value={state.cpc}
              onChange={(e) => handleStateChange('cpc')(Number(e.target.value))}
              placeholder="2.50"
              step="0.01"
            />
          </InputGroup>
          <InputGroup htmlFor="ticket" label="Ticket Médio" tooltip="O valor médio de cada venda realizada.">
            <InputWithAddon
              addon="R$"
              id="ticket"
              type="number"
              value={state.ticket}
              onChange={(e) => handleStateChange('ticket')(Number(e.target.value))}
              placeholder="300"
            />
          </InputGroup>
        </div>

        <InputGroup htmlFor="ctr" label="Taxa de Cliques (CTR)" tooltip="A porcentagem de pessoas que clicam no seu anúncio após vê-lo.">
          <div className="flex items-center gap-4">
            <Slider
              id="ctr"
              min={0.1}
              max={10}
              step={0.1}
              value={[state.ctr]}
              onValueChange={(v) => handleStateChange('ctr')(v[0])}
            />
            <div className="font-code text-primary w-20 text-center rounded-md bg-muted px-2 py-1 text-sm">{state.ctr.toFixed(1)}%</div>
          </div>
        </InputGroup>
        
        <InputGroup htmlFor="cvr" label="Taxa de Conversão (CVR)" tooltip="A porcentagem de visitantes que realizam uma compra no seu site.">
          <div className="flex items-center gap-4">
            <Slider
              id="cvr"
              min={0.1}
              max={15}
              step={0.1}
              value={[state.cvr]}
              onValueChange={(v) => handleStateChange('cvr')(v[0])}
            />
            <div className="font-code text-primary w-20 text-center rounded-md bg-muted px-2 py-1 text-sm">{state.cvr.toFixed(1)}%</div>
          </div>
        </InputGroup>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputGroup htmlFor="product-cost" label="Custo por Produto (CPV)" tooltip="Custo de produção/aquisição do produto vendido.">
             <InputWithAddon
              addon="R$"
              id="product-cost"
              type="number"
              value={state.productCost}
              onChange={(e) => handleStateChange('productCost')(Number(e.target.value))}
              placeholder="50"
            />
          </InputGroup>
          <InputGroup htmlFor="other-fees" label="Outras Taxas" tooltip="Taxas de gateway de pagamento, etc. (em %).">
             <InputWithAddon
              addon="%"
              id="other-fees"
              type="number"
              value={state.otherFees}
              onChange={(e) => handleStateChange('otherFees')(Number(e.target.value))}
              placeholder="4"
            />
          </InputGroup>
        </div>
      </CardContent>
    </Card>
  );
}
