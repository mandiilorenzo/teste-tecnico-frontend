import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-post-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {
  post: Post | null = null;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.postService.getPostById(id).subscribe(
          p => this.post = p,
          (err: any) => console.error("Erro ao buscar os detalhes do post:", err)
        );
      }
    });
  }

}
