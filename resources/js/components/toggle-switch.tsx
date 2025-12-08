export default function ToggleSwitch() {
    return (
        <label className="switch">
            <input checked={true} type="checkbox" className="toggle" />
            <span className="slider"></span>
            <span className="card-side"></span>
        </label>
    );
}
