import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Post } from '../../interfaces/post';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-create-post',
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup;
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      body: ['', Validators.required],
      createdAt: [new Date().toISOString()],
    });
  }
  
  onSubmit(): void {
    this.postForm.markAllAsTouched();

    if (this.postForm.invalid) {
      this.snackBar.open('Preencha todos os campos corretamente.', 'Fechar', {
        duration: 4000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.isSubmitting = true;

    const newPost: Post = this.postForm.value;
    this.postService.createPost(newPost).subscribe({
      next: post => {
        this.snackBar.open('✅ Notícia criada com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['toast-success']
        });

        this.postForm.reset();
        this.isSubmitting = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;

        const msg = (err.status === 400 && err.error === 'Max number of elements reached for this resource!')
          ? 'Limite de notícias atingido no servidor de teste. Apague algumas ou configure outro back-end.'
          : 'Falha ao criar notícia. Tente mais tarde.';

        this.snackBar.open(msg, '', {
          duration: 5000,
          panelClass: ['toast-error']
        });
      }
    });
  }
}
