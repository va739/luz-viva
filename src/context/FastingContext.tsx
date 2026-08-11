import React, { createContext, ReactNode, useContext, useState } from 'react';

export type JejumAtivo = {
  duracaoDias: number;
  diaAtual: number;
  proposito: string;
};

type FastingContextValue = {
  jejumAtivo: JejumAtivo | null;
  iniciarJejum: (duracaoDias: number, proposito: string) => void;
  encerrarJejum: () => void;
};

const FastingContext = createContext<FastingContextValue | undefined>(undefined);

/**
 * Estado do jejum ativo, compartilhado entre a Home e a tela de Jejum.
 * Precisa viver ACIMA do Tab.Navigator (não dentro de JejumScreen), porque
 * as abas usam unmountOnBlur — um useState local em JejumScreen se perderia
 * ao trocar de aba. Sem persistência real ainda (reinicia ao recarregar o app).
 */
export function FastingProvider({ children }: { children: ReactNode }) {
  const [jejumAtivo, setJejumAtivo] = useState<JejumAtivo | null>(null);

  const iniciarJejum = (duracaoDias: number, proposito: string) => {
    setJejumAtivo({ duracaoDias, diaAtual: 1, proposito });
  };

  const encerrarJejum = () => {
    setJejumAtivo(null);
  };

  return (
    <FastingContext.Provider value={{ jejumAtivo, iniciarJejum, encerrarJejum }}>
      {children}
    </FastingContext.Provider>
  );
}

export function useFasting(): FastingContextValue {
  const context = useContext(FastingContext);
  if (!context) {
    throw new Error('useFasting precisa ser usado dentro de um FastingProvider');
  }
  return context;
}
