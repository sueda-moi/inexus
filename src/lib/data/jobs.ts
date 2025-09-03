import type { Locale } from '@/store/useLocaleStore';

export type Job = {
    jobId: string;
    title: string;
    tags: string[];
    image: string;
    summary: {
        location: string;
        salary: string;
        type: string;
    };
    description: string;
    responsibilities: string[]; // 仕事内容
    qualifications: string[]; // 応募資格 (必須)
    welcome_qualifications: string[]; // 応募資格 (歓迎)
    other_qualifications: string[]; // 応募資格 (その他)
    benefits: string[]; // 労働条件 & アピールポイント
};

const jobs: Record<Locale, Job[]> = {
    // --- JAPANESE DATA ---
    ja: [
        {
            jobId: 'it-engineer-01',
            title: '【経験者採用】ITエンジニア募集',
            tags: ['正社員', '金融・保険', 'クラウド'],
            image: '/image/pg500/job-it.jpg',
            summary: {
                location: '本社 (東京都中央区)',
                salary: '年収 350万円 〜 1000万円',
                type: '正社員'
            },
            description: '金融業界のクライアントが多く、安定尚且つ大規模なシステム開発経験を積むことができ、スキルアップや最先端技術に触れる機会が豊富です。クラウド系の案件も多く、社内育成コースも充実しています。海外のECサイト構築などを通じ、グローバルな視野を養うことも可能です。',
            responsibilities: [
                '金融・保険・キャッシュレス関連システム開発全般（設計、開発、保守）',
                '海外ECサイト構築・運営／商品企画',
                'インフラ／ネットワーク／基盤、クラウドサービス（AWS, Azure）の移行、構築、保守'
            ],
            qualifications: [
                'IT業界での実務経験1年以上',
                'システム開発における設計・製造・試験の知識'
            ],
            welcome_qualifications: [
                '海外の仕事に興味のある方',
                '最先端の技術、トレンドにチャレンジしたい方',
                'グローバルビジネスに興味を持つ方'
            ],
            other_qualifications: [
                'メンバーと円滑にコミュニケーションが取れる方'
            ],
            benefits: [
                '契約期間：期間の定めなし',
                '試用期間：3カ月',
                '就業時間：9:00～18:00（休憩1時間）',
                '休日：土日、祝日',
                '残業：あり（月平均10時間）',
                '社会保険：健康保険、厚生年金、労災保険、雇用保険完備',
                'その他：各種手当あり'
            ],
        },
        // ... 他の日本の求人情報をここに追加
    ],
    // --- ENGLISH DATA ---
    en: [
        {
            jobId: 'it-engineer-01',
            title: '[Experienced Hire] IT Engineer Recruitment',
            tags: ['Full-time', 'Finance/Insurance', 'Cloud'],
            image: '/image/pg500/job-it.jpg',
            summary: {
                location: 'Head Office (Chuo City, Tokyo)',
                salary: 'Annual Salary: ¥3,500,000 - ¥10,000,000',
                type: 'Full-time Employee'
            },
            description: 'With many clients in the financial industry, you can gain experience in stable and large-scale system development, providing ample opportunities for skill enhancement and exposure to cutting-edge technology. We have numerous cloud-related projects and a comprehensive in-house training program. You can also develop a global perspective through experiences such as building and managing overseas e-commerce sites.',
            responsibilities: [
                'Overall development of systems for finance, insurance, and cashless services (design, development, maintenance)',
                'Building and operating overseas e-commerce sites / Product planning',
                'Migration, construction, and maintenance of infrastructure/networks/platforms and cloud services (AWS, Azure)'
            ],
            qualifications: [
                'Over 1 year of experience in the IT industry',
                'Knowledge of design, manufacturing, and testing in system development'
            ],
            welcome_qualifications: [
                'Interest in working on international projects',
                'Eagerness to challenge cutting-edge technologies and trends',
                'Interest in global business'
            ],
            other_qualifications: [
                'Ability to communicate smoothly with team members'
            ],
            benefits: [
                'Contract: No fixed term',
                'Trial Period: 3 months',
                'Working Hours: 9:00-18:00 (1-hour break)',
                'Holidays: Saturdays, Sundays, and public holidays',
                'Overtime: Yes (Average 10 hours/month)',
                'Social Insurance: Health Insurance, Pension, Worker\'s Comp, Employment Insurance',
                'Other: Various allowances available'
            ],
        },
        // ... Add other English jobs here
    ],
    // --- CHINESE DATA ---
    zh: [
        {
            jobId: 'it-engineer-01',
            title: '【社招】IT工程师招聘',
            tags: ['正式员工', '金融/保险', '云计算'],
            image: '/image/pg500/job-it.jpg',
            summary: {
                location: '总公司 (东京都中央区)',
                salary: '年薪 350万日元 〜 1000万日元',
                type: '正式员工'
            },
            description: '我们拥有众多金融行业的客户，您将有机会在稳定且大规模的系统开发中积累经验，提升技能并接触尖端技术。公司拥有丰富的云相关项目和完善的内部培训课程。您还可以通过构建和运营海外电子商务网站等工作，培养全球化视野。',
            responsibilities: [
                '金融、保险、无现金支付相关系统的全面开发（设计、开发、维护）',
                '海外电子商务网站的构建与运营/商品策划',
                '基础设施/网络/平台及云服务（AWS, Azure）的迁移、构建与维护'
            ],
            qualifications: [
                'IT行业1年以上工作经验',
                '具备系统开发中设计、制造、测试的相关知识'
            ],
            welcome_qualifications: [
                '对海外工作感兴趣',
                '希望挑战最前沿技术和趋势',
                '对全球业务有兴趣'
            ],
            other_qualifications: [
                '能与团队成员顺利沟通'
            ],
            benefits: [
                '合同期限：无固定期限',
                '试用期：3个月',
                '工作时间：9:00～18:00（休息1小时）',
                '假日：周六、周日、法定节假日',
                '加班：有（月平均10小时）',
                '社会保险：健康保险、厚生年金、劳灾保险、雇佣保险',
                '其他：提供各种津贴'
            ],
        },
        // ... add other Chinese jobs here
    ],
};


export const getAllJobs = (locale: Locale): Job[] => {
    return jobs[locale] || [];
};

export const getJobById = (jobId: string, locale: Locale): Job | undefined => {
    return (jobs[locale] || []).find(job => job.jobId === jobId);
};