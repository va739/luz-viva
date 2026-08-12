import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { ReferenciaDoDia, diasSemanaCurto, obterConteudoPorDiaDaSemana } from '../data/devotionalData';

export type EtapaDevocional = 'passagem' | 'devocional' | 'citacao' | 'oracao';

export type ProgressoDia = {
  passagem: boolean;
  devocional: boolean;
  citacao: boolean;
  oracao: boolean;
};

export type StatusDiaSemana = 'concluido' | 'andamento' | 'nao_iniciado';

export type DiaDaSemanaInfo = {
  label: string;
  ehSabado: boolean;
  ehHoje: boolean;
  status: StatusDiaSemana;
};

export type ResumoHomeDevocional =
  | { tipo: 'jornada'; tema: string; numeroDia: number; totalDias: number }
  | { tipo: 'descanso'; titulo: string };

type DevotionalContextValue = {
  hojeIndex: number;
  conteudoHoje: ReferenciaDoDia;
  progressoEtapas: ProgressoDia | null;
  diaHojeConcluido: boolean;
  descansoConcluido: boolean;
  semana: DiaDaSemanaInfo[];
  pontosDaJornadaAtual: boolean[];
  resumoHome: ResumoHomeDevocional;
  concluirEtapa: (etapa: EtapaDevocional) => void;
  concluirDescanso: () => void;
};

const ETAPAS_VAZIAS: ProgressoDia = { passagem: false, devocional: false, citacao: false, oracao: false };

function contarEtapasConcluidas(progresso: ProgressoDia): number {
  return Object.values(progresso).filter(Boolean).length;
}

type EstadoSemana = {
  progressoPorDiaSemana: Record<number, ProgressoDia>;
  descansoConcluido: boolean;
};

/**
 * Estado inicial de demonstração: os dias da semana anteriores ao dia atual
 * (exceto sábado) começam concluídos, para já exibir na visão semanal os
 * diferentes estados possíveis (concluído, atual, não iniciado) sem exigir
 * que o usuário jogue a semana inteira antes de ver o resultado.
 */
function criarEstadoInicial(hojeIndex: number): EstadoSemana {
  const progressoPorDiaSemana: Record<number, ProgressoDia> = {};
  for (let indice = 0; indice < 6; indice += 1) {
    progressoPorDiaSemana[indice] =
      indice < hojeIndex ? { passagem: true, devocional: true, citacao: true, oracao: true } : { ...ETAPAS_VAZIAS };
  }
  return { progressoPorDiaSemana, descansoConcluido: false };
}

const DevotionalContext = createContext<DevotionalContextValue | undefined>(undefined);

/**
 * Estado do Devocional Diário, compartilhado entre a Home e a tela de
 * Devocional. Assim como o FastingContext, precisa viver ACIMA do
 * Tab.Navigator (as abas usam unmountOnBlur). Sem persistência real ainda
 * (reinicia ao recarregar o app) — progresso controlado por dia da semana,
 * com domingo a sábado como ciclo (duas jornadas de 3 dias + descanso).
 */
export function DevotionalProvider({ children }: { children: ReactNode }) {
  const [hojeIndex] = useState(() => new Date().getDay());
  const [estado, setEstado] = useState<EstadoSemana>(() => criarEstadoInicial(hojeIndex));

  const conteudoHoje = useMemo(() => obterConteudoPorDiaDaSemana(hojeIndex), [hojeIndex]);

  const concluirEtapa = useCallback(
    (etapa: EtapaDevocional) => {
      setEstado((atual) => ({
        ...atual,
        progressoPorDiaSemana: {
          ...atual.progressoPorDiaSemana,
          [hojeIndex]: { ...(atual.progressoPorDiaSemana[hojeIndex] ?? ETAPAS_VAZIAS), [etapa]: true },
        },
      }));
    },
    [hojeIndex]
  );

  const concluirDescanso = useCallback(() => {
    setEstado((atual) => ({ ...atual, descansoConcluido: true }));
  }, []);

  const progressoEtapas = conteudoHoje.tipo === 'jornada' ? estado.progressoPorDiaSemana[hojeIndex] ?? ETAPAS_VAZIAS : null;

  const diaHojeConcluido =
    conteudoHoje.tipo === 'jornada' ? contarEtapasConcluidas(progressoEtapas ?? ETAPAS_VAZIAS) === 4 : estado.descansoConcluido;

  const semana = useMemo<DiaDaSemanaInfo[]>(
    () =>
      diasSemanaCurto.map((label, indice) => {
        const ehSabado = indice === 6;
        const ehHoje = indice === hojeIndex;
        let status: StatusDiaSemana;
        if (ehSabado) {
          status = estado.descansoConcluido ? 'concluido' : 'nao_iniciado';
        } else {
          const feitas = contarEtapasConcluidas(estado.progressoPorDiaSemana[indice] ?? ETAPAS_VAZIAS);
          status = feitas === 4 ? 'concluido' : feitas > 0 ? 'andamento' : 'nao_iniciado';
        }
        return { label, ehSabado, ehHoje, status };
      }),
    [estado, hojeIndex]
  );

  const pontosDaJornadaAtual = useMemo(() => {
    if (conteudoHoje.tipo !== 'jornada') return [];
    const inicioDaJornada = hojeIndex <= 2 ? 0 : 3;
    return [0, 1, 2].map((deslocamento) => semana[inicioDaJornada + deslocamento]?.status === 'concluido');
  }, [conteudoHoje, hojeIndex, semana]);

  const resumoHome: ResumoHomeDevocional =
    conteudoHoje.tipo === 'jornada'
      ? {
          tipo: 'jornada',
          tema: conteudoHoje.jornada.tema,
          numeroDia: conteudoHoje.dia.numeroDia,
          totalDias: conteudoHoje.dia.totalDias,
        }
      : { tipo: 'descanso', titulo: conteudoHoje.descanso.titulo };

  return (
    <DevotionalContext.Provider
      value={{
        hojeIndex,
        conteudoHoje,
        progressoEtapas,
        diaHojeConcluido,
        descansoConcluido: estado.descansoConcluido,
        semana,
        pontosDaJornadaAtual,
        resumoHome,
        concluirEtapa,
        concluirDescanso,
      }}
    >
      {children}
    </DevotionalContext.Provider>
  );
}

export function useDevotional(): DevotionalContextValue {
  const context = useContext(DevotionalContext);
  if (!context) {
    throw new Error('useDevotional precisa ser usado dentro de um DevotionalProvider');
  }
  return context;
}
