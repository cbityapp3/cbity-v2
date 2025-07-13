import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'school_admin' | 'teacher' | 'student';
  school?: string;
  avatar?: string;
  profile?: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('cbt_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo users
    const demoUsers = {
      'superadmin@gmail.com': {
        id: 'super_admin_1',
        email: 'superadmin@gmail.com',
        name: 'Super Administrator',
        role: 'super_admin' as const,
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        profile: {
          phone: '+234 806 946 2143',
          address: 'Lagos, Nigeria',
          joinDate: '2024-01-01',
          permissions: ['all']
        }
      },
      'admin@lagosmodel.edu.ng': {
        id: 'school_admin_1',
        email: 'admin@lagosmodel.edu.ng',
        name: 'Dr. Adebayo Olumide',
        role: 'school_admin' as const,
        school: 'Lagos State Model College',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        profile: {
          phone: '+234 802 123 4567',
          address: 'Ikeja, Lagos State',
          joinDate: '2024-02-01',
          permissions: ['school_management']
        }
      },
      'teacher@lagosmodel.edu.ng': {
        id: 'teacher_1',
        email: 'teacher@lagosmodel.edu.ng',
        name: 'Mrs. Adunni Fashola',
        role: 'teacher' as const,
        school: 'Lagos State Model College',
        avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        profile: {
          phone: '+234 811 123 4567',
          address: 'Lekki, Lagos',
          joinDate: '2024-03-01',
          subjects: ['Mathematics', 'Physics'],
          permissions: ['exam_management']
        }
      },
      'student@lagosmodel.edu.ng': {
        id: 'student_1',
        email: 'student@lagosmodel.edu.ng',
        name: 'Adebayo Oluwaseun',
        role: 'student' as const,
        school: 'Lagos State Model College',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        profile: {
          phone: '+234 801 123 4567',
          address: 'Ikeja, Lagos',
          joinDate: '2024-09-01',
          class: 'SS3A',
          studentId: 'STD001',
          permissions: ['exam_taking']
        }
      }
    };

    // Check credentials
    const userData = demoUsers[email as keyof typeof demoUsers];
    if (userData && password === 'password123') {
      setUser(userData);
      localStorage.setItem('cbt_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cbt_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};