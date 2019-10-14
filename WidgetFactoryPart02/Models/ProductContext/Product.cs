using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace TrainingWidgets.Models
{
    public enum ProductType
    {
        Internal,
        External
    }

    public static class ProductTypeExt
    {
        public static string Name(this ProductType val)
        {
            switch (val)
            {
                case ProductType.Internal: return "Внутренний";
                case ProductType.External: return "Внешний";
                default: return string.Empty;
            }
        }
    }

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

        [DataMember(Name = "type")]
        public ProductType Type { get; set; } = ProductType.Internal;

        [DataMember(Name = "typeName")]
        public string TypeName { get { return Type.Name(); } }

        [DataMember(Name = "withDiscount")]
        public bool WithDiscount { get; set; } = false;

        public virtual Category Category { get; set; }

    }
}