import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { LeadDetail } from '../components/LeadDetail/LeadDetail';
import { ALL_LEADS } from '../data/mockData';

export const TestLeadDetail: React.FC = () => {
    // Search for GRAFFITI to match user's context, fallback to first lead
    const demoLead = ALL_LEADS.find(l => l.name.toUpperCase().includes('GRAFFITI')) || ALL_LEADS[0];

    const [pNote, setPNote] = useState('');

    return (
        <div className="page-layout">
            <Sidebar />
            <main className="page-main">
                <div className="glass" style={{ borderRadius: '32px', overflow: 'hidden' }}>
                    <LeadDetail
                        lead={demoLead}
                        repNotes="Brak wpisów handlowca."
                        presidentNote={pNote}
                        onSavePresidentNote={setPNote}
                        isPrezes={true}
                    />
                </div>
            </main>
        </div>
    );
};
