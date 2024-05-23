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
        //private static List<ProductMaster> _products = new List<ProductMaster>();
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }




        // Action to display list of products
        public IActionResult Index()
        {
            return View();
        }

        public async Task<List<ProductMaster>> ProductDetails()
        {
            return await _context.Products.ToListAsync();
        }


        // GET: Products/Details/5
        public async Task<ProductMaster> GetEditDetails(int? id)
        {


            var product = await _context.Products
                .FirstOrDefaultAsync(m => m.ID == id);


            return product;
        }


        // POST: Products/Create
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateData([FromBody] ProductMaster addProduct)
        {

            if (ModelState.IsValid)
            {

                _context.Add(addProduct);
                await _context.SaveChangesAsync();
            }






            return Ok();
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> UpdateData([FromBody] ProductMaster updateProduct)
        {

            if (ModelState.IsValid)
            {

                _context.Update(updateProduct);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }
      
        // POST: Products/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var product = await _context.Products.FindAsync(id);
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ID == id);
        }


    }
}
