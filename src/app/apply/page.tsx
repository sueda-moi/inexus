'use client'; 

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import ApplicationForm from '@/components/careers/ApplicationForm';
import styles from './page.module.css'; 
import { getJobById, Job } from '@/lib/data/jobs';
import { useLocaleStore } from '@/store/useLocaleStore';
import { useMessage } from '@/lib/useMessage';


function ApplyPageContent() {
    const getMessage = useMessage();
    const { locale } = useLocaleStore();
    const searchParams = useSearchParams();
    const jobId = searchParams.get('job');
    const [job, setJob] = useState<Job | undefined>(undefined);


    useEffect(() => {
        if (jobId) {
            const foundJob = getJobById(jobId, locale);
            setJob(foundJob);
        }
    }, [jobId, locale]);

    if (!job) {
        return <div className={styles.loading}>Loading...</div>;
    }


    const uiTextForForm = {
      headerApplyingFor: getMessage('Pg900', 'apply_header_applying_for'),
      headerBackLink: getMessage('Pg900', 'apply_header_back_link'),
      labelName: getMessage('Pg900', 'apply_label_name'),
      labelEmail: getMessage('Pg900', 'apply_label_email'),
      labelPhone: getMessage('Pg900', 'apply_label_phone'),
      labelCoverLetter: getMessage('Pg900', 'apply_label_cover_letter'),
      labelResume: getMessage('Pg900', 'apply_label_resume'),
      buttonApply: getMessage('Pg900', 'apply_button_apply'),
      buttonApplying: getMessage('Pg900', 'apply_button_applying'),
      alertFileSize: getMessage('Pg900', 'apply_alert_file_size'),
      alertFileType: getMessage('Pg900', 'apply_alert_file_type'),
      alertFileRequired: getMessage('Pg900', 'apply_alert_file_required'),
      alertSuccess: getMessage('Pg900', 'apply_alert_success'),
      alertErrorGeneric: getMessage('Pg900', 'apply_alert_error_generic'),
      alertErrorDetails: getMessage('Pg900', 'apply_alert_error_details'),
      errorUnknown: getMessage('Pg900', 'apply_error_unknown'),
      errorGetUrl: getMessage('Pg900', 'apply_error_get_url'),
      errorS3Policy: getMessage('Pg900', 'apply_error_s3_policy'),
      errorS3Upload: getMessage('Pg900', 'apply_error_s3_upload'),
      errorSubmitData: getMessage('Pg900', 'apply_error_submit_data'),
    };

    return <ApplicationForm job={job} uiText={uiTextForForm} />;
}


export default function ApplyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main className={styles.pageContainer}>
                <ApplyPageContent />
            </main>
        </Suspense>
    );
}