import React, { useState, useEffect } from 'react';
import './ReportsLayout.css';

// Icon components using Font Awesome classes (since the project already uses FA)
const FileText = ({ size, className }) => <i className={`fa-solid fa-file-medical ${className}`} style={{fontSize: `${size}px`}}></i>;
const Calendar = ({ size, className }) => <i className={`fa-solid fa-calendar ${className}`} style={{fontSize: `${size}px`}}></i>;
const User = ({ size, className }) => <i className={`fa-solid fa-user-doctor ${className}`} style={{fontSize: `${size}px`}}></i>;
const Download = ({ size, className }) => <i className={`fa-solid fa-download ${className}`} style={{fontSize: `${size}px`}}></i>;
const Eye = ({ size, className }) => <i className={`fa-solid fa-eye ${className}`} style={{fontSize: `${size}px`}}></i>;
const Filter = ({ size, className }) => <i className={`fa-solid fa-filter ${className}`} style={{fontSize: `${size}px`}}></i>;

const ReportsLayout = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // 'table', 'grid', 'list'
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle view report functionality
  const handleViewReport = (report) => {
    setIsLoading(true);
    try {
      // Open report in new tab/window
      const reportUrl = report.fileUrl;
      const newWindow = window.open(reportUrl, '_blank', 'noopener,noreferrer');
      
      if (!newWindow) {
        alert('Please allow popups for this website to view reports');
      }
    } catch (error) {
      console.error('Error opening report:', error);
      alert('Error opening report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle download report functionality
  const handleDownloadReport = (report) => {
    setIsLoading(true);
    try {
      const reportUrl = report.fileUrl;
      const fileName = `${report.title.replace(/\s+/g, '_')}_${report.date}.pdf`;
      
      // Create a temporary anchor element for download
      const link = document.createElement('a');
      link.href = reportUrl;
      link.download = fileName;
      link.style.display = 'none';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      setTimeout(() => {
        alert('Report download started successfully!');
      }, 100);
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Error downloading report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Alternative download using anchor tag (can be used directly in JSX)
  const getDownloadLink = (report) => {
    const reportUrl = report.fileUrl;
    const fileName = `${report.title.replace(/\s+/g, '_')}_${report.date}.pdf`;
    return { href: reportUrl, download: fileName };
  };

  // Sample reports data
  useEffect(() => {
    const sampleReports = [
      {
        id: 1,
        title: 'Blood Test Report',
        doctor: 'Dr. Sarah Johnson',
        date: '2024-07-08',
        type: 'lab',
        status: 'completed',
        description: 'Complete Blood Count (CBC) analysis',
        fileUrl: '/blood_test_report.pdf',
        department: 'Pathology'
      },
      {
        id: 2,
        title: 'X-Ray Chest Report',
        doctor: 'Dr. Michael Chen',
        date: '2024-07-05',
        type: 'imaging',
        status: 'completed',
        description: 'Chest X-ray examination for routine checkup',
        fileUrl: '/xray_report.pdf',
        department: 'Radiology'
      },
      {
        id: 3,
        title: 'Cardiology Consultation',
        doctor: 'Dr. Emily Davis',
        date: '2024-07-02',
        type: 'consultation',
        status: 'completed',
        description: 'Cardiac health assessment and ECG results',
        fileUrl: '/cardiology_report.pdf',
        department: 'Cardiology'
      },
      {
        id: 4,
        title: 'MRI Brain Scan',
        doctor: 'Dr. Robert Wilson',
        date: '2024-06-28',
        type: 'imaging',
        status: 'pending',
        description: 'Brain MRI scan for neurological assessment',
        fileUrl: '/patient_report.pdf',
        department: 'Neurology'
      },
      {
        id: 5,
        title: 'Diabetes Management Report',
        doctor: 'Dr. Lisa Anderson',
        date: '2024-06-25',
        type: 'consultation',
        status: 'completed',
        description: 'HbA1c and glucose monitoring report',
        fileUrl: '/patient_report.pdf',
        department: 'Endocrinology'
      }
    ];
    setReports(sampleReports);
    setFilteredReports(sampleReports);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = reports;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(report => report.type === filterType);
    }

    // Search by title, doctor, or department
    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReports(filtered);
  }, [reports, filterType, searchTerm]);

  const getStatusBadge = (status) => {
    const statusClass = status === 'completed' ? 'status-completed' : 'status-pending';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'lab':
        return <FileText size={20} className="type-icon lab" />;
      case 'imaging':
        return <Eye size={20} className="type-icon imaging" />;
      case 'consultation':
        return <User size={20} className="type-icon consultation" />;
      default:
        return <FileText size={20} className="type-icon" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const TableView = () => (
    <div className="table-container">
      <table className="reports-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Report Title</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map(report => (
            <tr key={report.id}>
              <td>{getTypeIcon(report.type)}</td>
              <td>
                <div className="report-title-cell">
                  <h4 
                    className="clickable-title"
                    onClick={() => handleViewReport(report)}
                    title="Click to view report"
                  >
                    {report.title} <Eye size={14} className="view-icon" />
                  </h4>
                  <p>{report.description}</p>
                </div>
              </td>
              <td>{report.doctor}</td>
              <td>{report.department}</td>
              <td>{formatDate(report.date)}</td>
              <td>{getStatusBadge(report.status)}</td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="btn-view" 
                    title="View Report"
                    onClick={() => handleViewReport(report)}
                  >
                    <Eye size={16} />
                  </button>
                  <a 
                    className="btn-download btn-link" 
                    title="Download Report"
                    {...getDownloadLink(report)}
                  >
                    <Download size={16} />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const GridView = () => (
    <div className="grid-container">
      {filteredReports.map(report => (
        <div key={report.id} className="report-card">
          <div className="card-header">
            {getTypeIcon(report.type)}
            {getStatusBadge(report.status)}
          </div>
          <div className="card-content">
            <h3 
              className="clickable-title"
              onClick={() => handleViewReport(report)}
              title="Click to view report"
            >
              {report.title} <Eye size={14} className="view-icon" />
            </h3>
            <p className="card-description">{report.description}</p>
            <div className="card-meta">
              <span className="card-doctor">
                <User size={14} />
                {report.doctor}
              </span>
              <span className="card-date">
                <Calendar size={14} />
                {formatDate(report.date)}
              </span>
            </div>
            <div className="card-department">{report.department}</div>
          </div>
          <div className="card-actions">
            <button 
              className="btn-view"
              onClick={() => handleViewReport(report)}
            >
              <Eye size={16} />
              View
            </button>
            <button 
              className="btn-download"
              onClick={() => handleDownloadReport(report)}
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="list-container">
      {filteredReports.map(report => (
        <div key={report.id} className="list-item">
          <div className="list-icon">
            {getTypeIcon(report.type)}
          </div>
          <div className="list-content">
            <div className="list-main">
              <h4 
                className="clickable-title"
                onClick={() => handleViewReport(report)}
                title="Click to view report"
              >
                {report.title} <Eye size={14} className="view-icon" />
              </h4>
              <p>{report.description}</p>
            </div>
            <div className="list-meta">
              <span className="list-doctor">{report.doctor}</span>
              <span className="list-department">{report.department}</span>
              <span className="list-date">{formatDate(report.date)}</span>
              {getStatusBadge(report.status)}
            </div>
          </div>
          <div className="list-actions">
            <button 
              className="btn-view" 
              title="View Report"
              onClick={() => handleViewReport(report)}
            >
              <Eye size={16} />
            </button>
            <button 
              className="btn-download" 
              title="Download Report"
              onClick={() => handleDownloadReport(report)}
            >
              <Download size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="reports-layout">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <FileText size={24} className="spinning" />
            <p>Processing...</p>
          </div>
        </div>
      )}
      
      <div className="reports-header">
        <h1>Your Medical Reports</h1>
        <p>View and manage all your medical reports in one place</p>
        <div className="help-text">
          <span>💡 Tip: Click on any report title to view it, or use the action buttons to download</span>
        </div>
      </div>

      <div className="reports-controls">
        <div className="search-filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search reports, doctors, or departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-section">
            <Filter size={16} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Reports</option>
              <option value="lab">Lab Reports</option>
              <option value="imaging">Imaging Reports</option>
              <option value="consultation">Consultations</option>
            </select>
          </div>
        </div>

        <div className="view-controls">
          <button
            className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            Table
          </button>
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      <div className="reports-content">
        {filteredReports.length === 0 ? (
          <div className="no-reports">
            <FileText size={48} />
            <h3>No reports found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            {viewMode === 'table' && <TableView />}
            {viewMode === 'grid' && <GridView />}
            {viewMode === 'list' && <ListView />}
          </>
        )}
      </div>

      <div className="reports-summary">
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-number">{reports.length}</span>
            <span className="stat-label">Total Reports</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {reports.filter(r => r.status === 'completed').length}
            </span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {reports.filter(r => r.status === 'pending').length}
            </span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsLayout;