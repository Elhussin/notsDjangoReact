{
  field.type === "select" ? (
    <select
      id={field.name}
      name={field.name}
      value={formData[field.name] || ""}
      onChange={handleChange}
    >
      {field.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ) : null;
}


{field.type === 'checkbox' ? (
    <input
      type="checkbox"
      id={field.name}
      name={field.name}
      checked={formData[field.name] || false}
      onChange={(e) => handleChange({ target: { name: field.name, value: e.target.checked } })}
    />
  ) : null}


  {field.type === 'date' ? (
    <input
      type="date"
      id={field.name}
      name={field.name}
      value={formData[field.name] || ''}
      onChange={handleChange}
    />
  ) : null}