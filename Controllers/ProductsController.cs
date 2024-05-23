using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagementWeb.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagementWeb.Controllers
{
    [Authorize]
    public class ProductsController : Controller
    {
        private readonly ApplicationDbContext _context;
       
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }


        // Display products details
        public IActionResult Index()
        {
            return View();
        }
        // Display list of products added in cart page
        public IActionResult ShoppingCart()
        {
            return View();
        }
        // Display list of products 
        public IActionResult Product()
        {
            return View();
        }

        // get list of products details
        public async Task<List<ProductMaster>> ProductDetails()
        {
            return await _context.Products.ToListAsync();
        }


        // get product detail for edit
        public async Task<ProductMaster> GetEditDetails(int? id)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(m => m.ID == id);

            return product;
        }

        //create new product detail 
       
        [HttpPost]      
        public async Task<IActionResult> CreateData([FromBody] ProductMaster addProduct)
        {

            if (ModelState.IsValid)
            {

                _context.Add(addProduct);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }


        //update existing product detail 

        [HttpPost]     
        public async Task<IActionResult> UpdateData([FromBody] ProductMaster updateProduct)
        {

            if (ModelState.IsValid)
            {
                _context.Update(updateProduct);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        //delete existing product detail 
        [HttpPost]       
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var product = await _context.Products.FindAsync(id);
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok();
        }

      
    }
}
