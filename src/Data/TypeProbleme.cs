using System.ComponentModel.DataAnnotations;

namespace Interventions.Data.Entities
{

    public class TypeProbleme
    {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string descriptionTypeProbleme { get; set; }
    }


}
