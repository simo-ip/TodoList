using System;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities
{
    public class Todo //: IEntity
    {
        public int TodoId { get; set; }
        [Required]
        public string Description { get; set; }
        public bool IsDone { get; set; }
    }
}
