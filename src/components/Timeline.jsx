import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaCheckCircle, FaCircle } from 'react-icons/fa';

const timelineSteps = [
  {
    id: 1,
    title: 'Voter Registration',
    date: 'Months before Election Day',
    description: 'Citizens must register to vote in their state or district to be eligible to participate in the upcoming elections. Registration deadlines vary by region.',
    details: 'You can usually register online, by mail, or in person. You will need proof of identity and residency.',
  },
  {
    id: 2,
    title: 'Primaries and Caucuses',
    date: 'January - June of Election Year',
    description: 'Political parties select their candidates for the general election through state-level primary elections and caucuses.',
    details: 'Primaries are run by state governments (secret ballot), while caucuses are private meetings run by political parties.',
  },
  {
    id: 3,
    title: 'National Conventions',
    date: 'July - August of Election Year',
    description: 'Parties hold conventions to officially nominate their candidates for President and Vice President, and adopt a party platform.',
    details: 'Delegates selected during the primaries/caucuses vote for the nominee. The chosen nominee then announces their running mate.',
  },
  {
    id: 4,
    title: 'General Election Campaigning',
    date: 'September - Early November',
    description: 'Nominees campaign across the country, participating in debates, rallies, and advertising to win over voters.',
    details: 'Key focus is often on "swing states" where the outcome is uncertain and could go to either major candidate.',
  },
  {
    id: 5,
    title: 'Election Day',
    date: 'First Tuesday after first Monday in Nov',
    description: 'Registered voters cast their ballots at designated polling places or via mail-in voting.',
    details: 'While voters select presidential candidates, they are actually voting for electors pledged to those candidates.',
  },
  {
    id: 6,
    title: 'Electoral College Vote',
    date: 'Mid-December',
    description: 'Electors meet in their respective states to formally cast their votes for President and Vice President.',
    details: 'A candidate needs a majority of 270 electoral votes out of 538 to win the presidency.',
  },
  {
    id: 7,
    title: 'Inauguration Day',
    date: 'January 20th',
    description: 'The President-elect and Vice President-elect are sworn into office and begin their term.',
    details: 'The ceremony takes place at the U.S. Capitol building in Washington, D.C.',
  }
];

export default function Timeline() {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (id) => {
    if (expandedStep === id) {
      setExpandedStep(null);
    } else {
      setExpandedStep(id);
    }
  };

  return (
    <div className="timeline-container">
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--text-color)' }}>
        The Election Timeline
      </h2>
      <p style={{ marginBottom: '2rem', color: '#94a3b8', lineHeight: '1.6' }}>
        Understanding the democratic process is key to participation. Here is a general timeline of how major elections unfold.
      </p>

      <div className="timeline">
        {timelineSteps.map((step, index) => (
          <div key={step.id} className="timeline-item">
            <div className="timeline-marker">
              <div className="marker-circle">
                {expandedStep === step.id ? (
                  <FaCheckCircle color="var(--primary-color)" size={20} />
                ) : (
                  <FaCircle color="var(--border-color)" size={20} />
                )}
              </div>
              {index < timelineSteps.length - 1 && <div className="marker-line"></div>}
            </div>
            
            <div 
              className={`timeline-content ${expandedStep === step.id ? 'expanded' : ''}`}
              onClick={() => toggleStep(step.id)}
            >
              <div className="timeline-header">
                <div>
                  <span className="timeline-date">{step.date}</span>
                  <h3 className="timeline-title">{step.title}</h3>
                </div>
                <button className="expand-btn">
                  {expandedStep === step.id ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              
              <p className="timeline-desc">{step.description}</p>
              
              {expandedStep === step.id && (
                <div className="timeline-details">
                  <p>{step.details}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .timeline-container {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          height: 100%;
          overflow-y: auto;
        }

        .timeline {
          position: relative;
        }

        .timeline-item {
          display: flex;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .timeline-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 1.5rem;
          min-width: 24px;
        }

        .marker-circle {
          background: var(--bg-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .marker-line {
          flex-grow: 1;
          width: 2px;
          background-color: var(--border-color);
          margin-top: 0.5rem;
        }

        .timeline-content {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.25rem;
          flex-grow: 1;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .timeline-content:hover {
          border-color: #475569;
          transform: translateX(4px);
        }

        .timeline-content.expanded {
          border-color: var(--primary-color);
          background: rgba(30, 41, 59, 0.6);
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .timeline-date {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--primary-color);
          font-weight: 600;
          display: block;
          margin-bottom: 0.25rem;
        }

        .timeline-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-color);
          margin: 0;
        }

        .expand-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .timeline-content:hover .expand-btn {
          color: var(--text-color);
        }

        .timeline-desc {
          color: #cbd5e1;
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }

        .timeline-details {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
          color: #e2e8f0;
          font-size: 0.9rem;
          line-height: 1.6;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
