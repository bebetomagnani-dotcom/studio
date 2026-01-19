import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function Faq() {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-3xl font-headline font-bold text-center mb-6">Entenda o Cálculo</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>O que é a nova Taxa de 12,15%?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              O Brasil possui uma das cargas tributárias mais complexas do mundo. Historicamente, as plataformas de publicidade absorviam parte desses custos. Com a nova regulamentação e a reforma tributária, o custo de PIS/COFINS (Federal) e ISS (Municipal) passa a ser discriminado na nota fiscal. Isso significa que para cada R$ 100,00 que você investe, aproximadamente R$ 12,15 são recolhidos pelo governo, e apenas R$ 87,85 efetivamente compram espaço no leilão da Meta.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Como proteger meu lucro?</AccordionTrigger>
          <AccordionContent>
             <p className="text-muted-foreground">
              Não adianta apenas aumentar o orçamento. Você precisa melhorar a eficiência do seu funil. Se o custo de mídia subiu 12%, sua Taxa de Conversão (CVR) precisa subir proporcionalmente ou seu Ticket Médio deve ser reajustado. Use os sliders na calculadora acima para encontrar seu novo ponto de equilíbrio (Break-Even Point) e simular cenários de otimização.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>O que é ROAS e CAC Real?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              <strong>ROAS (Return on Ad Spend) Real:</strong> É o retorno sobre o seu investimento TOTAL em anúncios, incluindo os impostos. Calculamos sobre o valor bruto (com impostos) para refletir a realidade do seu fluxo de caixa e a verdadeira eficiência da sua campanha.
              <br/><br/>
              <strong>CAC (Custo por Aquisição) Real:</strong> É o custo total, com impostos, para adquirir um novo cliente. Muitas calculadoras usam apenas a verba de mídia, o que gera um CAC ilusoriamente baixo. Nossa ferramenta mostra o custo verdadeiro que impacta seu balanço.
            </p>
          </AccordionContent>
        </AccordionItem>
         <AccordionItem value="item-4">
          <AccordionTrigger>Como as empresas do Lucro Real podem ser afetadas?</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
             Empresas no regime tributário de Lucro Real podem, em teoria, creditar-se de parte dos impostos pagos (especialmente PIS/COFINS), reduzindo o impacto real da taxação. Esta calculadora foca no cenário mais comum para simplificar, mas é crucial consultar seu contador para entender as oportunidades de recuperação fiscal específicas para o seu negócio.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
