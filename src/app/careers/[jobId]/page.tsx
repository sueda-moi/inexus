// app/careers/[jobId]/page.tsx

import JobDetailLayout from '@/components/careers/JobDetailLayout';
import { getJobById } from '@/lib/data/jobs';
import { notFound } from 'next/navigation';

// 型定義は変更なし
type PageProps = {
  params: {
    jobId: string;
  };
};

// 1. まずは通常の関数として定義する（export defaultを付けない）
const JobDetailPage = ({ params }: PageProps) => {
  const { jobId } = params;
  const locale = 'ja'; 
  const job = getJobById(jobId, locale);

  if (!job) {
    notFound();
  }

  return (
    <JobDetailLayout job={job} />
  );
};

// 2. ファイルの最後で、定義した関数を default export する
export default JobDetailPage;