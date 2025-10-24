import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CHART_COLORS, getLastName } from '../../utils/courseUtils';

const SectionEnrollmentChart = ({ sections }) => {
  if (!sections || sections.length === 0) return null;

  // Single section display
  if (sections.length === 1 && sections[0].actualEnrollment > 0) {
    const section = sections[0];
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={[
              { name: 'Enrolled', value: section.actualEnrollment, fill: CHART_COLORS[0] },
              { name: 'Available', value: Math.max(section.maxEnrollment - section.actualEnrollment, 0), fill: CHART_COLORS[1] }
            ]}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={120}
            dataKey="value"
          >
            <Cell key="cell-enrolled" fill={CHART_COLORS[0]} />
            <Cell key="cell-available" fill={CHART_COLORS[1]} />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  // Multiple sections display
  const allLastNames = sections.map(s => getLastName(s.instructor));
  const uniqueLastNames = Array.from(new Set(allLastNames.filter(Boolean)));
  const showLastName = uniqueLastNames.length > 1;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      marginBottom: '24px'
    }}>
      {sections
        .filter(section => section.actualEnrollment > 0)
        .map((section, idx) => (
          <div key={idx} style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '16px' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50', fontSize: '18px' }}>
              Section {section.section}
              {showLastName && section.instructor ? ` (${getLastName(section.instructor)})` : ''}
            </h4>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Enrolled', value: section.actualEnrollment, fill: CHART_COLORS[0] },
                    { name: 'Available', value: Math.max(section.maxEnrollment - section.actualEnrollment, 0), fill: CHART_COLORS[1] }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  dataKey="value"
                >
                  <Cell key="cell-enrolled" fill={CHART_COLORS[0]} />
                  <Cell key="cell-available" fill={CHART_COLORS[1]} />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ))}
    </div>
  );
};

export default SectionEnrollmentChart;
