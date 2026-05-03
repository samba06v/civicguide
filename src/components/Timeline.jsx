import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaCheckCircle, FaCircle } from 'react-icons/fa';

const timelineSteps = [
  { id: 1, title: 'Voter Registration', date: 'Months before Election Day', description: 'Citizens must register to vote in their state or district to be eligible to participate in the upcoming elections.', details: 'You can usually register online, by mail, or in person. Registration deadlines and ID requirements vary by state.' },
  { id: 2, title: 'Primaries and Caucuses', date: 'January - June of Election Year', description: 'Political parties select their candidates through state-level primaries and caucuses.', details: 'Primaries typically use ballots while caucuses are party meetings with local discussion and voting.' },
  { id: 3, title: 'National Conventions', date: 'July - August of Election Year', description: 'Parties formally nominate candidates and adopt policy platforms.', details: 'Delegates selected in primaries/caucuses vote, then nominees accept and announce campaign priorities.' },
  { id: 4, title: 'General Election Campaigning', date: 'September - Early November', description: 'Candidates debate policies and campaign nationwide.', details: 'Campaigns focus on turnout and persuasion, especially in competitive battleground states.' },
  { id: 5, title: 'Election Day', date: 'First Tuesday after first Monday in November', description: 'Registered voters cast ballots in-person or by mail where available.', details: 'Voters choose electors in presidential races and often vote for other federal, state, and local offices too.' },
  { id: 6, title: 'Electoral College Vote', date: 'Mid-December', description: 'Electors meet in each state to cast official votes.', details: 'A presidential candidate needs a majority of electoral votes (currently 270 of 538) to win.' },
  { id: 7, title: 'Inauguration Day', date: 'January 20', description: 'The President and Vice President are sworn in.', details: 'The inauguration marks the constitutional transfer of executive power and start of a new term.' }
];

export default function Timeline() {
  const [expandedStep, setExpandedStep] = useState(null);

  return (
    <div className="timeline-container">
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--text-color)' }}>The Election Timeline</h2>
      <p style={{ marginBottom: '2rem', color: '#94a3b8', lineHeight: '1.6' }}>Understanding the democratic process is key to participation. Explore each step for details.</p>
      <div className="timeline">
        {timelineSteps.map((step, index) => {
          const isExpanded = expandedStep === step.id;
          return (
            <div key={step.id} className="timeline-item">
              <div className="timeline-marker">
                <div className="marker-circle">{isExpanded ? <FaCheckCircle color="var(--primary-color)" size={20} /> : <FaCircle color="var(--border-color)" size={20} />}</div>
                {index < timelineSteps.length - 1 && <div className="marker-line" />}
              </div>
              <div className={`timeline-content ${isExpanded ? 'expanded' : ''}`}>
                <button className="timeline-header" onClick={() => setExpandedStep(isExpanded ? null : step.id)} aria-expanded={isExpanded}>
                  <div>
                    <span className="timeline-date">{step.date}</span>
                    <h3 className="timeline-title">{step.title}</h3>
                  </div>
                  <span className="expand-btn">{isExpanded ? <FaChevronUp /> : <FaChevronDown />}</span>
                </button>
                <p className="timeline-desc">{step.description}</p>
                {isExpanded && <div className="timeline-details"><p>{step.details}</p></div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
