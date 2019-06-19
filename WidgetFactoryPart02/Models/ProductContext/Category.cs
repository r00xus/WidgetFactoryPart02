using System.Collections.Generic;
using System.Runtime.Serialization;

namespace TrainingWidgets.Models
{
    [DataContract]
    public class Category : EntityBase
    {
        public Category() { }

        [DataMember(Name = "code")]
        public string Code { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        public virtual List<Product> Products { get; set; }
    }
}