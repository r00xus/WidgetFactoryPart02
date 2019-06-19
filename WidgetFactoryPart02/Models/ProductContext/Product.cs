using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace TrainingWidgets.Models
{
    [DataContract]
    public class Product : EntityBase
    {
        [DataMember(Name = "code")]
        public string Code { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "categoryId")]
        public long? CategoryId { get; set; }

        [DataMember(Name = "categoryName"), NotMapped]
        public string CategoryName { get { return Category?.Name; } }

        public virtual Category Category { get; set; }
    }
}