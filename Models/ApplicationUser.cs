using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ProductManagementWeb.Models
{
   

    public class ApplicationUser : IdentityUser
    {
       
            //public int UserId { get; set; }
            //public string UserEmail { get; set; }
            //public DateTime CreatedOn { get; set; }
            //public int Points { get; set; }
       

    }
    //public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    //{
    //    //public ApplicationDbContext(): base("ApplicationDbContext")
    //    //{

    //    //}

     
    //}
}
