using System.ComponentModel.DataAnnotations;

namespace Interventions.Data.Entities
{
    public class Probleme
    {
      private DateTime _dateProbleme = DateTime.Now;

      public int Id { get; set; }

        [Required]
        [StringLength(50)]
        [MinLength(3)]

      public string prenom { get; set; }

      public DateTime dateProbleme
      {
        get { return _dateProbleme; }
        set { _dateProbleme = value; }
      }

  }
}
