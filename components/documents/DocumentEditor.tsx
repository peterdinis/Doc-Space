"use client"

import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Users, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { documentService } from '@/services/documentService';
import { Document } from '@/types/document';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/shared/useToast';
import { AppSidebar } from '../dashboard/AppSidebar';
import { CollaboratorsList } from '../collaborations/CollaborationsList';
import { TiptapEditor } from '../editor/TipTapEditor';
import { ShareDialog } from './ShareDialog';

const DocumentEditor = () => {
  const router = useRouter()
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [document, setDocument] = useState<Document | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  const handleBack = () => {
    router.push("/dashboard")
  };

  const handleShare = () => {
    setIsShareDialogOpen(true);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleShareDocument = async (email: string, role: 'editor' | 'viewer') => {
    if (!document) return;
    
    try {
      await documentService.shareDocument(document.id, email, role);
      toast({
        title: "Document shared",
        description: `Document has been shared with ${email}`,
      });
    } catch (error) {
      console.error('Error sharing document:', error);
      toast({
        title: "Error sharing document",
        description: "There was a problem sharing the document.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Document not found</h1>
          <Button onClick={handleBack}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg font-semibold border-none shadow-none focus-visible:ring-0 max-w-md bg-transparent"
                  placeholder="Untitled document"
                />
              </div>
              <div className="flex items-center space-x-3">
                <CollaboratorsList collaborators={document.collaborators} />
                <Button
                  onClick={handleShare}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Last saved: {lastSaved.toLocaleTimeString()}
            </div>
          </header>

          {/* Editor */}
          <main className="flex-1 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 min-h-screen shadow-sm">
              <TiptapEditor
                content={content}
                onChange={handleContentChange}
              />
            </div>
          </main>

          {/* Share Dialog */}
          <ShareDialog
            isOpen={isShareDialogOpen}
            onClose={() => setIsShareDialogOpen(false)}
            onShare={handleShareDocument}
            documentTitle={document.title}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DocumentEditor;
