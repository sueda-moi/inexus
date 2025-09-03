'use client';
import JobListings from '@/components/Pg006/JobListings';

import { useMessage } from '@/lib/useMessage';
import { useLocaleStore } from '@/store/useLocaleStore';
import { getAllJobs } from '@/lib/data/jobs';
import PageHeader from '@/components/Common/PageHeader';



export default function Page500() {
  const getMessage = useMessage();
  const { locale } = useLocaleStore();
  const jobsFromData = getAllJobs(locale);

  const jobsForList = jobsFromData.map(job => ({
    title: job.title,
    tags: job.tags,
    image: job.image,
    href: `/careers/${job.jobId}`
  }));
  return (
    <>

      <PageHeader 
        title={getMessage('Pg006', 'header_title')}
        subtitle={getMessage('Pg006', 'header_subtitle')} 
        category={getMessage('Pg006', 'header_category')} 
        imageUrl={'/image/pg500/header-image.jpg'} />
      <main>
        <JobListings jobs={jobsForList} />
      </main>
    </>
  );
}