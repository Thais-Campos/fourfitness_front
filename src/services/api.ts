// API Service para integração com backend FourFitness
// Backend: https://github.com/PI-Delivery-04/aplicativo_fitness_personalizado

const API_BASE_URL = 'http://localhost:8000/api'; // Ajuste para a URL do seu backend

// Tipos
export interface Goal {
  id: string;
  title: string;
  description?: string;
  target: number;
  current: number;
  unit: string;
  deadline?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Workout {
  id: string;
  nome: string;
  descricao?: string;
  duracao: number;
  exercicios?: Exercise[];
  concluido: boolean;
  data: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  weight?: number;
  height?: number;
  age?: number;
  gender?: string;
}

export interface BMIData {
  weight: number;
  height: number;
  bmi: number;
  category: string;
  userId?: string;
}

// Mock de autenticação - substitua pela lógica real do seu backend
const getCurrentUser = (): string | null => {
  return localStorage.getItem('userId') || 'mock-user-id';
};

// Helper para headers
const getHeaders = () => ({
  'Content-Type': 'application/json',
  // Adicione token de autenticação se necessário
  // 'Authorization': `Bearer ${getToken()}`,
});

// === GOALS API ===

export const goalsAPI = {
  // Listar todas as metas
  async getAll(): Promise<Goal[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/goals`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Erro ao buscar metas');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      // Fallback para localStorage em caso de erro
      const stored = localStorage.getItem('goals');
      return stored ? JSON.parse(stored) : [];
    }
  },

  // Buscar meta por ID
  async getById(id: string): Promise<Goal> {
    try {
      const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Erro ao buscar meta');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Criar nova meta
  async create(goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Goal> {
    try {
      const response = await fetch(`${API_BASE_URL}/goals`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          ...goal,
          userId: getCurrentUser(),
        }),
      });
      if (!response.ok) throw new Error('Erro ao criar meta');
      const newGoal = await response.json();
      
      // Sincronizar com localStorage
      const goals = await this.getAll();
      localStorage.setItem('goals', JSON.stringify([...goals, newGoal]));
      
      return newGoal;
    } catch (error) {
      console.error('API Error:', error);
      // Fallback para localStorage
      const newGoal: Goal = {
        ...goal,
        id: Date.now().toString(),
        userId: getCurrentUser() || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const stored = localStorage.getItem('goals');
      const goals = stored ? JSON.parse(stored) : [];
      localStorage.setItem('goals', JSON.stringify([...goals, newGoal]));
      return newGoal;
    }
  },

  // Atualizar meta
  async update(id: string, goal: Partial<Goal>): Promise<Goal> {
    try {
      const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          ...goal,
          updatedAt: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error('Erro ao atualizar meta');
      const updatedGoal = await response.json();
      
      // Sincronizar com localStorage
      const goals = await this.getAll();
      const updated = goals.map((g) => (g.id === id ? updatedGoal : g));
      localStorage.setItem('goals', JSON.stringify(updated));
      
      return updatedGoal;
    } catch (error) {
      console.error('API Error:', error);
      // Fallback para localStorage
      const stored = localStorage.getItem('goals');
      const goals: Goal[] = stored ? JSON.parse(stored) : [];
      const updated = goals.map((g) =>
        g.id === id ? { ...g, ...goal, updatedAt: new Date().toISOString() } : g
      );
      localStorage.setItem('goals', JSON.stringify(updated));
      return updated.find((g) => g.id === id)!;
    }
  },

  // Deletar meta
  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Erro ao deletar meta');
      
      // Sincronizar com localStorage
      const goals = await this.getAll();
      const filtered = goals.filter((g) => g.id !== id);
      localStorage.setItem('goals', JSON.stringify(filtered));
    } catch (error) {
      console.error('API Error:', error);
      // Fallback para localStorage
      const stored = localStorage.getItem('goals');
      const goals: Goal[] = stored ? JSON.parse(stored) : [];
      const filtered = goals.filter((g) => g.id !== id);
      localStorage.setItem('goals', JSON.stringify(filtered));
    }
  },
};

// === WORKOUTS API ===

export const workoutsAPI = {
  // Listar todos os treinos
  async getAll(): Promise<Workout[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Erro ao buscar treinos');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      // Fallback para localStorage
      const stored = localStorage.getItem('workouts');
      return stored ? JSON.parse(stored) : [];
    }
  },

  // Buscar treino por ID
  async getById(id: string): Promise<Workout> {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Erro ao buscar treino');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Criar novo treino
  async create(workout: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>): Promise<Workout> {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          ...workout,
          userId: getCurrentUser(),
        }),
      });
      if (!response.ok) throw new Error('Erro ao criar treino');
      const newWorkout = await response.json();
      
      // Sincronizar com localStorage
      const workouts = await this.getAll();
      localStorage.setItem('workouts', JSON.stringify([...workouts, newWorkout]));
      
      return newWorkout;
    } catch (error) {
      console.error('API Error:', error);
      // Fallback para localStorage
      const newWorkout: Workout = {
        ...workout,
        id: Date.now().toString(),
        userId: getCurrentUser() || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const stored = localStorage.getItem('workouts');
      const workouts = stored ? JSON.parse(stored) : [];
      localStorage.setItem('workouts', JSON.stringify([...workouts, newWorkout]));
      return newWorkout;
    }
  },

  // Atualizar treino
  async update(id: string, workout: Partial<Workout>): Promise<Workout> {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          ...workout,
          updatedAt: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error('Erro ao atualizar treino');
      const updatedWorkout = await response.json();
      
      // Sincronizar com localStorage
      const workouts = await this.getAll();
      const updated = workouts.map((w) => (w.id === id ? updatedWorkout : w));
      localStorage.setItem('workouts', JSON.stringify(updated));
      
      return updatedWorkout;
    } catch (error) {
      console.error('API Error:', error);
      // Fallback para localStorage
      const stored = localStorage.getItem('workouts');
      const workouts: Workout[] = stored ? JSON.parse(stored) : [];
      const updated = workouts.map((w) =>
        w.id === id ? { ...w, ...workout, updatedAt: new Date().toISOString() } : w
      );
      localStorage.setItem('workouts', JSON.stringify(updated));
      return updated.find((w) => w.id === id)!;
    }
  },

  // Deletar treino
  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Erro ao deletar treino');
      
      // Sincronizar com localStorage
      const workouts = await this.getAll();
      const filtered = workouts.filter((w) => w.id !== id);
      localStorage.setItem('workouts', JSON.stringify(filtered));
    } catch (error) {
      console.error('API Error:', error);
      // Fallback para localStorage
      const stored = localStorage.getItem('workouts');
      const workouts: Workout[] = stored ? JSON.parse(stored) : [];
      const filtered = workouts.filter((w) => w.id !== id);
      localStorage.setItem('workouts', JSON.stringify(filtered));
    }
  },

  // Marcar treino como completo
  async toggleComplete(id: string): Promise<Workout> {
    try {
      const workout = await this.getById(id);
      return await this.update(id, { concluido: !workout.concluido });
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
};

// === BMI API ===

export const bmiAPI = {
  // Calcular e salvar IMC
  async calculate(weight: number, height: number): Promise<BMIData> {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let category = '';
    if (bmi < 18.5) category = 'Abaixo do peso';
    else if (bmi < 25) category = 'Peso normal';
    else if (bmi < 30) category = 'Sobrepeso';
    else category = 'Obesidade';

    const bmiData: BMIData = {
      weight,
      height,
      bmi,
      category,
      userId: getCurrentUser() || undefined,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/bmi`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(bmiData),
      });
      if (!response.ok) throw new Error('Erro ao salvar IMC');
      const result = await response.json();
      
      // Salvar em localStorage
      localStorage.setItem('bmi', JSON.stringify(result));
      
      return result;
    } catch (error) {
      console.error('API Error:', error);
      // Fallback para localStorage
      localStorage.setItem('bmi', JSON.stringify(bmiData));
      return bmiData;
    }
  },

  // Buscar histórico de IMC
  async getHistory(): Promise<BMIData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/bmi/history`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Erro ao buscar histórico de IMC');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      const stored = localStorage.getItem('bmi');
      return stored ? [JSON.parse(stored)] : [];
    }
  },
};

// === USER API ===

export const userAPI = {
  // Buscar perfil do usuário
  async getProfile(): Promise<User | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Erro ao buscar perfil');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return null;
    }
  },

  // Atualizar perfil
  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao atualizar perfil');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
};

export default {
  goals: goalsAPI,
  workouts: workoutsAPI,
  bmi: bmiAPI,
  user: userAPI,
};
