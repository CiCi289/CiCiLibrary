﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CiCiLibrary.Models
{
    public class Author
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Book> Books { get; set; }
    }
}