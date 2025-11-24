# Generated migration for adding about_text and background_image fields to Brand

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_remove_product_description_product_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='brand',
            name='about_text',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='brand',
            name='background_image',
            field=models.ImageField(blank=True, null=True, upload_to='brand_backgrounds/'),
        ),
    ]
