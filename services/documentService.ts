import { Document, Collaborator } from '@/types/document';

// Mock data
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Project Proposal',
    content: '<h1>Project Proposal</h1><p>This is a sample document with some content...</p>',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16'),
    ownerId: '1',
    ownerName: 'John Doe',
    collaborators: [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'owner' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'editor', isOnline: true }
    ],
    isShared: true,
    status: 'published'
  },
  {
    id: '2',
    title: 'Meeting Notes',
    content: '<h1>Team Meeting - Jan 20, 2024</h1><p>Meeting agenda and notes...</p>',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    ownerId: '1',
    ownerName: 'John Doe',
    collaborators: [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'owner' }
    ],
    isShared: false,
    status: 'draft'
  }
];

export const documentService = {
  getUserDocuments: async (userId?: string): Promise<Document[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockDocuments.filter(doc => 
      doc.ownerId === userId || doc.collaborators.some(c => c.id === userId)
    );
  },

  getDocument: async (documentId: string): Promise<Document | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockDocuments.find(doc => doc.id === documentId) || null;
  },

  createDocument: async (data: { title: string; content: string }): Promise<Document> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newDocument: Document = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content || `<h1>${data.title}</h1><p>Start writing your document here...</p>`,
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: '1', // Mock user ID
      ownerName: 'John Doe', // Mock user name
      collaborators: [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'owner' }
      ],
      isShared: false,
      status: 'draft'
    };
    
    mockDocuments.push(newDocument);
    return newDocument;
  },

  updateDocument: async (documentId: string, updates: { title?: string; content?: string }): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const docIndex = mockDocuments.findIndex(doc => doc.id === documentId);
    if (docIndex !== -1) {
      if (updates.title) mockDocuments[docIndex].title = updates.title;
      if (updates.content) mockDocuments[docIndex].content = updates.content;
      mockDocuments[docIndex].updatedAt = new Date();
    }
  },

  shareDocument: async (documentId: string, email: string, role: 'editor' | 'viewer'): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const docIndex = mockDocuments.findIndex(doc => doc.id === documentId);
    if (docIndex !== -1) {
      // Simulate adding collaborator
      const newCollaborator: Collaborator = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role,
        isOnline: Math.random() > 0.5
      };
      
      mockDocuments[docIndex].collaborators.push(newCollaborator);
      mockDocuments[docIndex].isShared = true;
      return true;
    }
    return false;
  }
};
