import React, { useState } from 'react';
import logo from './dimple.png';
import logos from './dimplelogo.png';
import { FaBars } from 'react-icons/fa';
import './App.css';

function App() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
const [showProfile, setShowProfile] = useState(false);



  const url = 'https://script.google.com/macros/s/AKfycbzqDP8atn-soHFWEMpcokcMcEzrtV1WLh0_ZI2unsf1frA6LLBIJJEh-SANUFTv3ertkA/exec'; // Replace with your deployed Google Apps Script URL


  const sections = [
    { name: 'Dashboard', url: 'https://docs.google.com/spreadsheets/d/1d5k5bommpneIJqiifzH3D85oa3N4yeaLyM8X4jKQYa4/edit?gid=0#gid=0' },
    { name: 'Inventory', url: 'https://docs.google.com/spreadsheets/d/18NB4jN3JSmLndIwSK4CdUzyUsbg7hZ-pghn1znGdCow/edit?gid=829029287#gid=829029287' },
    { name: 'Sales', url: 'https://docs.google.com/spreadsheets/u/0/d/1YleKo0e3OOddvwPgCUhSQ05NkuPr51cG26GJESZL6U8/edit' },
    { name: 'Employees', url: 'https://docs.google.com/spreadsheets/d/1d5k5bommpneIJqiifzH3D85oa3N4yeaLyM8X4jKQYa4/edit?gid=0#gid=0' },
    { name: 'Reports', url: 'https://docs.google.com/spreadsheets/d/1d5k5bommpneIJqiifzH3D85oa3N4yeaLyM8X4jKQYa4/edit?gid=0#gid=0' },
    { name: 'Settings', url: 'https://docs.google.com/spreadsheets/d/18NB4jN3JSmLndIwSK4CdUzyUsbg7hZ-pghn1znGdCow/edit?gid=829029287#gid=829029287' },
  ];

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4',
    },
    card: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      textAlign: 'center',
      maxWidth: '500px',
      width: '100%',
    },
    logo: { height: '100px', padding: '10px', marginBottom: '20px' },
    logos: { height: '100px', padding: '10px', marginBottom: '20px' },
    input: {
      padding: '10px',
      margin: '10px 0',
      width: '100%',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      marginTop: '20px',
      padding: '10px 20px',
      width: '100%',
      fontSize: '20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      fontSize: '12px',
      marginTop: '-8px',
      marginBottom: '8px',
      textAlign: 'left',
    },
    passwordField: { position: 'relative' },
    toggleIcon: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#666',
    },
    header: {
      backgroundColor: '#007bff',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      padding: '15px 20px',
      fontWeight: 'bold',
      fontSize: '22px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      flexWrap: 'wrap',
    },
    menuIcon: {
      fontSize: '24px',
      cursor: 'pointer',
      marginRight: '20px',
    },
    sectionLink: {
      marginRight: '20px',
      cursor: 'pointer',
      fontSize: '18px',
      transition: 'color 0.2s ease-in-out',
    },

    buttonArea: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 70px)',
      backgroundColor: '#f0f2f5',
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
    },
    sidebar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '250px',
      backgroundColor: '#fff',
      boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
      padding: '20px',
      zIndex: 1000,
      transform: 'translateX(-100%)',
      transition: 'transform 0.3s ease-in-out',
    },
    sidebarOpen: {
      transform: 'translateX(0)',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 999,
    },
    sidebarItem: {
      padding: '12px 0',
      borderBottom: '1px solid #eee',
      cursor: 'pointer',
      fontSize: '18px',
      color: '#333',
    },
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!form.password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `Name=${encodeURIComponent(form.name)}&Email=${encodeURIComponent(form.email)}&Password=${encodeURIComponent(form.password)}`
        });
        setLoggedIn(true);
        alert('Login Successful and saved to sheet!');
      } catch (err) {
        alert('Failed to save. Please try again.');
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };


const handleLogout = () => {
    setForm({ name: '', email: '', password: '' });
    setErrors({});
    setLoggedIn(false);
    setSidebarOpen(false);
    setActiveSection(null);
    setShowProfile(false);
    // Optional: window.location.reload(); // for full page reset
  };

  if (!loggedIn) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <img src={logo} alt="dimple" style={styles.logo} />
          <img src={logos} alt="dimplelogo" style={styles.logos} />

          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={styles.input} />
            {errors.name && <div style={styles.error}>{errors.name}</div>}

            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} />
            {errors.email && <div style={styles.error}>{errors.email}</div>}

            <div style={styles.passwordField}>
              <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} />
              <span
                style={styles.toggleIcon}
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
            {errors.password && <div style={styles.error}>{errors.password}</div>}

            <button type="submit" style={styles.button}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      {sidebarOpen && <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />}
      <div style={{ ...styles.sidebar, ...(sidebarOpen ? styles.sidebarOpen : {}) }}>
        <h3 style={{ marginBottom: '80px' }}>Menu</h3>
        {sections.map((sec) => (
          <div
            key={sec.name}
            style={styles.sidebarItem}
            onClick={() => {
              if (sec.url) window.open(sec.url, '_blank');
              setActiveSection(sec);
              setSidebarOpen(false);
                            setShowProfile(false);

            }}
          >
            {sec.name}
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={styles.header}>
        <FaBars style={styles.menuIcon} onClick={() => setSidebarOpen(true)} />
        <span style={{ marginRight: '20px' }}>Dimple ERP</span>
        {sections.map((sec) => (
          <span
            key={sec.name}
           onClick={() => {
              setActiveSection(sec);
              setShowProfile(false);
            }}
            
            style={{
              ...styles.sectionLink,
              color: activeSection?.name === sec.name ? '#ffeb3b' : 'white', // yellow if active
              textDecoration: activeSection?.name === sec.name ? 'underline' : 'none',
              fontWeight: activeSection?.name === sec.name ? 'bold' : 'normal',
            }}
          >
            {sec.name}
          </span>
        ))}
      </div>

      {/* Main Panel */}
      <div style={styles.buttonArea}>
        {!activeSection ? (
          <div style={styles.card}>
            <div style={styles.sectionTitle}>Welcome</div>
            <p style={{ marginTop: '10px', color: '#555', fontSize: '14px' }}>
              Click the menu icon or section name to open a Google Sheet.
            </p>
          </div>
        ) : (
          <div style={styles.card}>
            <img src={logo} alt="dimple" style={styles.logo} />
            <img src={logos} alt="dimplelogo" style={styles.logos} />
            <div style={styles.sectionTitle}>{activeSection.name}</div>

            {/* Buttons based on section */}
            {activeSection.name === 'Dashboard' && (
              <>
                <button style={{ ...styles.button, backgroundColor: '#28a745' }}>Total Products</button>
                <button style={{ ...styles.button, backgroundColor: '#ffc107' }}>Today's Sales</button>
              </>
            )}

            {activeSection.name === 'Inventory' && (
              <>
                <button style={{ ...styles.button, backgroundColor: '#28a745' }}>Product List Table</button>
                <button style={{ ...styles.button, backgroundColor: '#ffc107' }}>Add Product</button>
              </>
            )}

            {activeSection.name === 'Sales' && (
              <>
                <button style={{ ...styles.button, backgroundColor: '#28a745' }}>Sales Order List</button>
                <button style={{ ...styles.button, backgroundColor: '#ffc107' }}>Create Sales Order</button>
              </>
            )}

            {activeSection.name === 'Employees' && (
              <>
                <button style={{ ...styles.button, backgroundColor: '#28a745' }}>Employee List</button>
                <button style={{ ...styles.button, backgroundColor: '#ffc107' }}>Attendance Details</button>
              </>
            )}

            {activeSection.name === 'Reports' && (
              <>
                <button style={{ ...styles.button, backgroundColor: '#28a745' }}>HR Report</button>
                <button style={{ ...styles.button, backgroundColor: '#ffc107' }}>Sales Report</button>
                <button style={{ ...styles.button, backgroundColor: '#17a2b8' }}>Inventory Report</button>
              </>
            )}

            {activeSection.name === 'Settings' && (
              <>
   <button style={{ ...styles.button, backgroundColor: '#dc3545' }} onClick={handleLogout}>Logout</button>
<button
      style={{ ...styles.button, backgroundColor: '#6c757d' }}
      onClick={() => setShowProfile(!showProfile)}
    >
      Profile
    </button>              </>
            )}
              {showProfile && (
              <div style={styles.profileCard}>
                <h3>Profile Info</h3>
                <p><strong>Name:</strong> {form.name}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Password:</strong> {form.password}</p>
          </div>
        )}
      </div>

      )}
    </div> </div>
  );
}

export default App;
