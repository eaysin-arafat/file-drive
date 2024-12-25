import { useOrganization, useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { api } from '../convex/_generated/api';
import { Doc } from '../convex/_generated/dataModel';

const formSchema = z.object({
  title: z.string().min(1).max(200),
  file: z
    .custom<FileList>((val) => val instanceof FileList, 'Required')
    .refine((files) => files.length > 0, 'Required')
});

export const useUploadFile = () => {
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const organization = useOrganization();
  const user = useUser();
  const generatedUploadUrl = useMutation(api.files.generateUploadUrl);
  const createFile = useMutation(api.files.createFile);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      file: undefined
    }
  });
  const fileRef = form.register('file');

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!orgId) return;

    const postUrl = await generatedUploadUrl();
    const fileType = values.file[0].type;

    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': fileType },
      body: values.file[0]
    });
    const { storageId } = await result.json();

    const types = {
      'image/png': 'image',
      'image/jpeg': 'image',
      'application/pdf': 'pdf',
      'text/csv': 'csv'
    } as Record<string, Doc<'files'>['type']>;

    const payload = {
      name: values.title,
      fileId: storageId,
      orgId,
      type: types[fileType]
    };

    try {
      await createFile(payload);

      form.reset();
      setIsFileDialogOpen(false);

      toast.success('File Uploaded');
    } catch (error) {
      toast.error('Something Went wrong!');
    }
  };

  return {
    isFileDialogOpen,
    setIsFileDialogOpen,
    form,
    fileRef,
    onSubmit
  };
};
