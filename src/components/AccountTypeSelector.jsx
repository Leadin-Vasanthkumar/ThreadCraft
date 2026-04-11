const AccountTypeSelector = ({ accountType, setAccountType }) => {
  return (
    <div className="selector-group">
      <label className="selector-label">Account Privilege</label>
      <div className="pill-container">
        <button 
          className={`pill-button ${accountType === 'free' ? 'active' : ''}`}
          onClick={() => setAccountType('free')}
        >
          Standard
        </button>
        <button 
          className={`pill-button ${accountType === 'verified' ? 'active' : ''}`}
          onClick={() => setAccountType('verified')}
        >
          Premium
        </button>
      </div>
    </div>
  );
};

export default AccountTypeSelector;
