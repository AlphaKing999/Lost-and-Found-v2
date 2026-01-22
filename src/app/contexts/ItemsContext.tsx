import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FoundItem {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  dateFound: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'claimed';
  submittedBy: string;
  contactEmail: string;
  createdAt: string;
}

export interface ClaimRequest {
  id: string;
  itemId: string;
  claimantName: string;
  claimantEmail: string;
  claimantPhone: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface ItemsContextType {
  items: FoundItem[];
  claims: ClaimRequest[];
  addItem: (item: Omit<FoundItem, 'id' | 'createdAt' | 'status'>) => void;
  updateItemStatus: (id: string, status: FoundItem['status']) => void;
  deleteItem: (id: string) => void;
  addClaim: (claim: Omit<ClaimRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateClaimStatus: (id: string, status: ClaimRequest['status']) => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

// Sample data
const sampleItems: FoundItem[] = [
  {
    id: '1',
    title: 'Blue Backpack',
    category: 'Bags',
    description: 'Blue JanSport backpack found in the library. Contains textbooks and a notebook.',
    location: 'Main Library - 2nd Floor',
    dateFound: '2026-01-10',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    status: 'approved',
    submittedBy: 'John Doe',
    contactEmail: 'john@school.edu',
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: '2',
    title: 'iPhone 13',
    category: 'Electronics',
    description: 'Black iPhone 13 with cracked screen protector. Found near the cafeteria.',
    location: 'Cafeteria',
    dateFound: '2026-01-11',
    imageUrl: 'https://images.unsplash.com/photo-1592286927505-b9e2c0e8d9ba?w=400',
    status: 'approved',
    submittedBy: 'Jane Smith',
    contactEmail: 'jane@school.edu',
    createdAt: '2026-01-11T14:30:00Z'
  },
  {
    id: '3',
    title: 'Calculator',
    category: 'School Supplies',
    description: 'TI-84 Plus graphing calculator in blue case.',
    location: 'Math Building - Room 301',
    dateFound: '2026-01-12',
    imageUrl: 'https://images.unsplash.com/photo-1587925358603-c2eea5305? w=400',
    status: 'approved',
    submittedBy: 'Mike Johnson',
    contactEmail: 'mike@school.edu',
    createdAt: '2026-01-12T09:15:00Z'
  },
  {
    id: '4',
    title: 'Water Bottle',
    category: 'Personal Items',
    description: 'Stainless steel Hydro Flask with stickers.',
    location: 'Gym Locker Room',
    dateFound: '2026-01-12',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
    status: 'approved',
    submittedBy: 'Sarah Williams',
    contactEmail: 'sarah@school.edu',
    createdAt: '2026-01-12T16:45:00Z'
  }
];

export function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<FoundItem[]>(() => {
    const stored = localStorage.getItem('lostAndFoundItems');
    return stored ? JSON.parse(stored) : sampleItems;
  });
  
  const [claims, setClaims] = useState<ClaimRequest[]>(() => {
    const stored = localStorage.getItem('lostAndFoundClaims');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('lostAndFoundItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('lostAndFoundClaims', JSON.stringify(claims));
  }, [claims]);

  const addItem = (item: Omit<FoundItem, 'id' | 'createdAt' | 'status'>) => {
    const newItem: FoundItem = {
      ...item,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setItems(prev => [newItem, ...prev]);
  };

  const updateItemStatus = (id: string, status: FoundItem['status']) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const addClaim = (claim: Omit<ClaimRequest, 'id' | 'createdAt' | 'status'>) => {
    const newClaim: ClaimRequest = {
      ...claim,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setClaims(prev => [newClaim, ...prev]);
  };

  const updateClaimStatus = (id: string, status: ClaimRequest['status']) => {
    setClaims(prev => prev.map(claim => 
      claim.id === id ? { ...claim, status } : claim
    ));
    
    // If claim is approved, mark item as claimed
    if (status === 'approved') {
      const claim = claims.find(c => c.id === id);
      if (claim) {
        updateItemStatus(claim.itemId, 'claimed');
      }
    }
  };

  return (
    <ItemsContext.Provider value={{
      items,
      claims,
      addItem,
      updateItemStatus,
      deleteItem,
      addClaim,
      updateClaimStatus
    }}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems must be used within ItemsProvider');
  }
  return context;
}
