import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Preciso pagar para jogar?",
    answer: "Não! O cadastro e a participação nos quizzes são 100% gratuitos.",
  },
  {
    question: "Como funcionam os prêmios?",
    answer: "Cada estabelecimento parceiro define quais prêmios oferece. Fique atento às regras do local onde você estiver jogando.",
  },
  {
    question: "Posso jogar em mais de um lugar?",
    answer: "Sim! Você pode participar de quizzes em diferentes bares, restaurantes ou online e somar pontos em todos.",
  },
  {
    question: "É seguro?",
    answer: "Sim, seguimos as diretrizes da LGPD e cuidamos dos seus dados com responsabilidade.",
  },
  {
    question: "Como entro em contato?",
    answer: "Fale com nosso time pelo WhatsApp, e-mail ou formulário de contato.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dúvidas Frequentes
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tudo o que você precisa saber sobre o Quis
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300"
              style={{ border: '2px solid #0061E0' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-blue-50/50 transition-colors duration-300"
              >
                <h3 className="text-base font-medium text-gray-800 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: '#FF6B35',
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t" style={{ borderColor: '#E5E7EB' }}>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;