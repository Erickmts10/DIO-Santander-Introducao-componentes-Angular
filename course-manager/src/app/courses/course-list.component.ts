import { Component, OnInit } from "@angular/core";
import { Course } from "./course";
import { CourseService } from "./course-service";

@Component({
    templateUrl:'./course-list.component.html'

})
export class CourseListComponent implements OnInit {

    filterDeCourses: Course[] = [];

    _courses: Course[] = [];

    _filterBy!: string;

    constructor(private courseServiece: CourseService) { }

    ngOnInit(): void {
        this.retriveAll();
            
    }

    retriveAll(): void {
        this.courseServiece.retrieveAll().subscribe({
            next: courses => {
                this._courses = courses;
                this.filterDeCourses = this._courses;
            },
            error: err => console.log('Error', err)
        })
        
    }

    deleteById(courseId: number): void {
        this.courseServiece.deleteById(courseId).subscribe({
            next: () => {
                console.log('Deleted with success');
                this.retriveAll();
            },
            error: err => console.log('Error', err)
        })
    }

    set Filter(value: string) {
        this._filterBy = value;

        this.filterDeCourses = this._courses.filter((course: Course) => course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
    }

    get filter() {
        return this._filterBy
    }

}