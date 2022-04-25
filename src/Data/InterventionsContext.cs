using Interventions.Data.Entities;
using Microsoft.EntityFrameworkCore;


namespace Interventions.Data
{
  public class InterventionsContext : DbContext
  {
    public InterventionsContext(DbContextOptions<InterventionsContext> options) : base(options)
    {

    }
    public DbSet<Probleme> DeclarerProblemes { get; set; }
    public DbSet<TypeProbleme> TypesProbleme { get; set; }
  }
}
