import "./PokemonCard.css"

function PokemonCard({ name, id, imageUrl }) {
  return (
    <div className="pokemon-card">
      <div className="pokemon-card-image">
        <img src={imageUrl || "/placeholder.svg"} alt={`${name} sprite`} />
      </div>
      <div className="pokemon-card-info">
        <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
        <span className="pokemon-id">#{id.toString().padStart(3, "0")}</span>
      </div>
    </div>
  )
}

export default PokemonCard

