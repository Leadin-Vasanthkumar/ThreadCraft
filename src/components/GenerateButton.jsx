export default function GenerateButton({ isGenerating, onClick, disabled }) {
  return (
    <button
      className="generate-button"
      onClick={onClick}
      disabled={disabled || isGenerating}
    >
      {isGenerating ? (
        <>
          <div className="spinner"></div> Generating...
        </>
      ) : (
        '✨ Generate'
      )}
    </button>
  );
}
