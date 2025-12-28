-- Enable RLS on storage_announcements table
ALTER TABLE public.storage_announcements ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (announcements are public data)
CREATE POLICY "Allow public read access to announcements" 
ON public.storage_announcements 
FOR SELECT 
USING (true);

-- Enable realtime for storage_announcements
ALTER PUBLICATION supabase_realtime ADD TABLE public.storage_announcements;