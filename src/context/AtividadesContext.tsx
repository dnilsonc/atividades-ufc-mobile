import React, { createContext, useContext, useState } from 'react';

type Atividade = {
  id: number;
  nome: string;
  responsavel: string;
  data: string;
  descricao: string;
};

type AtividadesContextType = {
  atividades: Atividade[];
  adicionarAtividade: (atividade: Atividade) => void;
  editarAtividade: (atividade: Atividade) => void;
  removerAtividade: (id: number) => void;
};

const AtividadesContext = createContext<AtividadesContextType | undefined>(undefined);

export const AtividadesProvider = ({ children }: { children: React.ReactNode }) => {
  const [atividades, setAtividades] = useState<Atividade[]>([]);

  // Função para adicionar uma nova atividade
  const adicionarAtividade = (atividade: Atividade) => {
    setAtividades((prevAtividades) => [...prevAtividades, atividade]);
  };

  // Função para editar uma atividade existente
  const editarAtividade = (atividadeEditada: Atividade) => {
    setAtividades((prevAtividades) =>
      prevAtividades.map((atividade) =>
        atividade.id === atividadeEditada.id ? atividadeEditada : atividade
      )
    );
  };

  // Função para remover uma atividade
  const removerAtividade = (id: number) => {
    setAtividades((prevAtividades) =>
      prevAtividades.filter((atividade) => atividade.id !== id)
    );
  };

  return (
    <AtividadesContext.Provider
      value={{ atividades, adicionarAtividade, editarAtividade, removerAtividade }}
    >
      {children}
    </AtividadesContext.Provider>
  );
};

// Hook para acessar o contexto
export const useAtividades = (): AtividadesContextType => {
  const context = useContext(AtividadesContext);
  if (!context) {
    throw new Error('useAtividades deve ser usado dentro de um AtividadesProvider');
  }
  return context;
};
