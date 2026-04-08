export default function AccountTypeSelector({ accountType, setAccountType }) {
  return (
    <div className="selector-group">
      <div className="selector-label">X (Twitter) Account Type</div>
      <div className="pill-container">
        <button
          className={`pill-button ${accountType === 'free' ? 'active' : ''}`}
          onClick={() => setAccountType('free')}
        >
          Free (280 chars max)
        </button>
        <button
          className={`pill-button ${accountType === 'verified' ? 'active' : ''}`}
          onClick={() => setAccountType('verified')}
          title="Verified/Pro accounts support longer tweets"
        >
          Verified / Pro 
        </button>
      </div>
    </div>
  );
}
