using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ben.ViewModels.Admin.Dashboard
{
    public class GetStatisticsViewModel
    {
        public int Ideas { get; set; }
        public int Users { get; set; }
        public int Events { get; set; }
        public int Tags { get; set; }
        public int Categories { get; set; }
    }
}
