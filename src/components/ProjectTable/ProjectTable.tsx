'use client';

import React, { useState } from 'react';
import type { ProjectLabels } from '@/types/Pg004';
import styles from './ProjectTable.module.css';

type Project = {
    title: string;
    responsibility: string;
    phase: string;
    technology: string;
};

type Props = {
    category: string;
    projects: Project[];
    labels: ProjectLabels;
};

const ProjectTable: React.FC<Props> = ({ category, projects, labels }) => {

    //   console.log('DEBUG ProjectTable is loaded');
    //   console.log('Labels:', labels);
    //   console.log('⚠️ Received labels:', labels);
    //   console.log('⚠️ tech_stack label:', labels.tech_stack);

    const [expanded, setExpanded] = useState(true); // Default to expanded

    return (
        <div className={styles.tableBlock}>
            {/* <div style={{ background: 'red', color: 'white' }}>DEBUG ProjectTable is loaded</div> */}
            <button
                className={styles.tableHeaderButton}
                onClick={() => setExpanded((prev) => !prev)}
            >
                <h3 className={styles.tableTitle}>{category}</h3>
                <span className={styles.icon}>{expanded ? '−' : '+'}</span>
            </button>

            {expanded && (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>{labels.project_name}</th>
                            <th>{labels.role}</th>
                            <th>{labels.phase}</th>
                            <th>{labels.tech_stack}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((p, idx) => (
                            <tr key={idx}>
                                <td>{p.title}</td>
                                <td>{p.responsibility}</td>
                                <td>{p.phase}</td>
                                <td>{p.technology}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProjectTable;
