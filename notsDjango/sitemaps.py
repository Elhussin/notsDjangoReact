from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from notes.models import *

class ArticleSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.8

    def items(self):
        return Branch.objects.all()

    def location(self, item):
        return reverse('article_detail', args=[item.slug])
