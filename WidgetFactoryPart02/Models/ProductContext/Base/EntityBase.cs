using System.Runtime.Serialization;

namespace TrainingWidgets.Models
{
    [DataContract]
    public class EntityBase
    {
        [DataMember(Name = "id")]
        public long Id { get; set; }
    }
}